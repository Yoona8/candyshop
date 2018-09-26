'use strict';

var catalog = document.querySelector('.catalog__cards');
var catalogLoad = catalog.querySelector('.catalog__load');
var goodTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
var cartGoodTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
var cart = document.querySelector('.goods__cards');
var cartEmptyElement = cart.querySelector('.goods__card-empty');
var cartEmptyElementCopy = cartEmptyElement.cloneNode(true);
var deliver = document.querySelector('.deliver');
var courier = deliver.querySelector('.deliver__courier');
var store = deliver.querySelector('.deliver__store');
var rangeSlider = document.querySelector('.range');
var rangeBar = rangeSlider.querySelector('.range__filter');
var rangeMinOutput = rangeSlider.querySelector('.range__price--min');
var rangeMaxOutput = rangeSlider.querySelector('.range__price--max');
var rangeBarWidth = rangeBar.offsetWidth;
var payment = document.querySelector('.payment');
var card = payment.querySelector('.payment__card-wrap');
var cash = payment.querySelector('.payment__cash-wrap');

var getRangeMovePercentage = function (element) {
  var rangeCurrentY = element.offsetLeft;
  return Math.round((rangeCurrentY / rangeBarWidth) * 100);
};

var renderRangePrice = function (element) {
  var moveX = getRangeMovePercentage(element);
  var output = rangeMaxOutput;

  if (element.classList.contains('range__btn--left')) {
    output = rangeMinOutput;
  }

  element.style.left = moveX + '%';
  output.textContent = moveX;
};

var onRangeButtonMouseup = function (e) {
  if (e.target.classList.contains('range__btn')) {
    renderRangePrice(e.target, e.clientX);
  }
};

rangeBar.addEventListener('mouseup', onRangeButtonMouseup);

var initDeliveryOptions = function (current) {
  courier.classList.add('visually-hidden');
  store.classList.add('visually-hidden');
  deliver.querySelector('.' + current).classList.remove('visually-hidden');
};

var initPaymentOptions = function (current) {
  card.classList.add('visually-hidden');
  cash.classList.add('visually-hidden');
  payment.querySelector('.' + current + '-wrap').classList.remove('visually-hidden');
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomItemsFromArray = function (arr, count) {
  var totalListOfItems = arr;
  var items = [];

  for (var i = 0; i < count; i++) {
    var randomIndex = getRandomInt(0, totalListOfItems.length - 1);
    items.push(totalListOfItems[randomIndex]);
    arr.splice(randomIndex, 1);
  }

  return items;
};

var getContents = function (count) {
  var INGREDIENTS = [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ];

  var ingredients = getRandomItemsFromArray(INGREDIENTS, count);
  var content = ingredients.join(', ');

  return content.charAt(0).toUpperCase() + content.slice(1);
};

var getGoods = function (numberOfGoods) {
  var GOOD_NAMES = [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ];

  var IMAGES = [
    'gum-cedar.jpg',
    'gum-chile.jpg',
    'gum-eggplant.jpg',
    'gum-mustard.jpg',
    'gum-portwine.jpg',
    'gum-wasabi.jpg',
    'ice-cucumber.jpg',
    'ice-eggplant.jpg',
    'ice-garlic.jpg',
    'ice-italian.jpg',
    'ice-mushroom.jpg',
    'ice-pig.jpg',
    'marmalade-beer.jpg',
    'marmalade-caviar.jpg',
    'marmalade-corn.jpg',
    'marmalade-new-year.jpg',
    'marmalade-sour.jpg',
    'marshmallow-bacon.jpg',
    'marshmallow-beer.jpg',
    'marshmallow-shrimp.jpg',
    'marshmallow-spicy.jpg',
    'marshmallow-wine.jpg',
    'soda-bacon.jpg',
    'soda-celery.jpg',
    'soda-cob.jpg',
    'soda-garlic.jpg',
    'soda-peanut-grapes.jpg',
    'soda-russian.jpg'
  ];

  var goods = [];

  for (var i = 0; i < numberOfGoods; i++) {
    var randomNameIndex = getRandomInt(0, GOOD_NAMES.length - 1);
    var randomName = GOOD_NAMES[randomNameIndex];
    var randomImageIndex = getRandomInt(0, IMAGES.length - 1);
    var randomImage = 'img/cards/' + IMAGES[randomImageIndex];

    GOOD_NAMES.splice(randomNameIndex, 1);
    IMAGES.splice(randomImageIndex, 1);

    var good = {
      name: randomName,
      image: randomImage,
      amount: getRandomInt(0, 20),
      price: getRandomInt(100, 1500),
      weight: getRandomInt(30, 300),
      rating: {
        value: getRandomInt(1, 5),
        number: getRandomInt(10, 900)
      },
      nutritionFacts: {
        sugar: !!getRandomInt(0, 1),
        energy: getRandomInt(70, 500),
        contents: getContents(3)
      }
    };

    goods.push(good);
  }

  return goods;
};

var randomGoods = getGoods(26);
var goodsInCart = [];

var renderBlockOfElements = function (elements, container, callback) {
  container.textContent = '';

  var fragment = document.createDocumentFragment();

  elements.forEach(function (element) {
    fragment.appendChild(callback(element));
  });

  container.appendChild(fragment);
};

var getGoodsElement = function (good) {
  var goodElement = goodTemplate.cloneNode(true);
  var goodPriceElement = goodElement.querySelector('.card__price');
  var goodCurrencyElement = goodPriceElement.querySelector('.card__currency');
  var goodWeightElement = goodPriceElement.querySelector('.card__weight');
  var goodRatingElement = goodElement.querySelector('.stars__rating');
  var goodImageElement = goodElement.querySelector('.card__img');
  var goodRatingClass = 'stars__rating';
  var goodRatingModificator = '';
  var goodElementAdditionalClass = 'card--little';
  var goodSugarMessage = 'Без сахара';

  goodRatingElement.classList = '';
  goodRatingElement.classList.add(goodRatingClass);

  if (good.amount > 5) {
    goodElementAdditionalClass = 'card--in-stock';
  } else if (good.amount === 0) {
    goodElementAdditionalClass = 'card--soon';
  }

  switch (good.rating.value) {
    case 1:
      goodRatingModificator = 'one';
      break;
    case 2:
      goodRatingModificator = 'two';
      break;
    case 3:
      goodRatingModificator = 'three';
      break;
    case 4:
      goodRatingModificator = 'four';
      break;
    case 5:
      goodRatingModificator = 'five';
      break;
    default:
      break;
  }

  if (good.nutritionFacts.sugar) {
    goodSugarMessage = 'Содержит сахар';
  }

  goodRatingElement.classList.add(goodRatingClass + '--' + goodRatingModificator);
  goodRatingElement.textContent = 'Рейтинг: ' + good.rating.value + ' звёзд';
  goodElement.classList.add(goodElementAdditionalClass);
  goodWeightElement.textContent = '/ ' + good.weight + ' Г';
  goodPriceElement.textContent = good.price + ' ';
  goodPriceElement.appendChild(goodCurrencyElement);
  goodPriceElement.appendChild(goodWeightElement);
  goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
  goodElement.querySelector('.card__title').textContent = good.name;
  goodElement.querySelector('.card__characteristic').textContent = goodSugarMessage + '. ' + good.nutritionFacts.energy + ' ккал';
  goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents + '.';
  goodImageElement.src = good.image;
  goodImageElement.alt = good.name;

  return goodElement;
};

var getCartElement = function (good) {
  var cartElement = cartGoodTemplate.cloneNode(true);
  var cartImageElement = cartElement.querySelector('.card-order__img');

  cartElement.querySelector('.card-order__title').textContent = good.name;
  cartElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
  cartElement.querySelector('.card-order__count').value = good.orderedAmount;
  cartImageElement.src = good.image;
  cartImageElement.alt = good.name;

  return cartElement;
};

var renderGoods = function () {
  catalog.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
  renderBlockOfElements(randomGoods, catalog, getGoodsElement);
};

var renderCart = function () {
  var goodsInCartLink = document.querySelector('.main-header__basket');
  var goodsInCartCount = goodsInCart.length;
  var totalPrice = 0;

  goodsInCart.forEach(function (current) {
    totalPrice += current.orderedAmount * current.price;
  });

  renderBlockOfElements(goodsInCart, cart, getCartElement);

  if (goodsInCartCount === 0) {
    cart.classList.add('goods__cards--empty');
    cart.appendChild(cartEmptyElementCopy);
    cartEmptyElement.classList.remove('visually-hidden');
    goodsInCartLink.textContent = 'В корзине ничего нет';
  } else {
    cart.classList.remove('goods__cards--empty');
    cartEmptyElement.classList.add('visually-hidden');
    document.querySelector('.main-header__basket').textContent = 'В корзине ' + goodsInCartCount + ' товара на ' + totalPrice + '₽';
  }
};

var getGoodNameFromCatalog = function (element) {
  return element.querySelector('.card__title').textContent;
};

var getGoodNameFromCart = function (element) {
  return element.querySelector('.card-order__title').textContent;
};

var getGoodFromArray = function (arrayOfGoods, goodName) {
  return arrayOfGoods.find(function (item) {
    return item.name === goodName;
  });
};

var addGoodToCart = function (element, goodsInStore) {
  var goodName = getGoodNameFromCatalog(element);
  var goodInStore = getGoodFromArray(goodsInStore, goodName);

  if (goodInStore.amount <= 0) {
    return;
  }

  goodInStore.amount--;

  var goodFromCart = getGoodFromArray(goodsInCart, goodInStore.name);

  if (goodFromCart) {
    goodFromCart.orderedAmount++;
  } else {
    goodsInCart.push(Object.assign({orderedAmount: 1}, {
      name: goodInStore.name,
      image: goodInStore.image,
      price: goodInStore.price
    }));
  }
};

var removeGoodFromCart = function (element, goodsInStore) {
  var goodName = getGoodNameFromCart(element);
  var goodInCart = getGoodFromArray(goodsInCart, goodName);
  var goodInCartIndex = goodsInCart.indexOf(goodInCart);

  goodsInCart.splice(goodInCartIndex, 1);

  var goodInStore = getGoodFromArray(goodsInStore, goodName);

  goodInStore.amount += goodInCart.orderedAmount;
};

var onAddToFavoriteClick = function (e) {
  if (e.target.classList.contains('card__btn-favorite')) {
    e.preventDefault();
    e.target.classList.toggle('card__btn-favorite--selected');
  }
};

var onAddToCartClick = function (e) {
  if (e.target.classList.contains('card__btn')) {
    e.preventDefault();
    addGoodToCart(e.target.closest('.catalog__card'), randomGoods);
    renderCart();
    renderGoods();
  }
};

var onRemoveFromCartClick = function (e) {
  if (e.target.classList.contains('card-order__close')) {
    e.preventDefault();
    removeGoodFromCart(e.target.closest('.card-order'), randomGoods);
    renderCart();
    renderGoods();
  }
};

renderGoods();

if (goodsInCart.length !== 0) {
  renderCart();
}

var currentDeliveryOption = deliver.querySelector('.toggle-btn__input:checked').id;

initDeliveryOptions(currentDeliveryOption);

var renderCheckedDeliveryOption = function (option) {
  if (currentDeliveryOption) {
    deliver.querySelector('.' + currentDeliveryOption).classList.add('visually-hidden');
  }

  deliver.querySelector('.' + option).classList.remove('visually-hidden');

  currentDeliveryOption = option;
};

var onDeliverToggleClick = function (e) {
  if (e.target.classList.contains('toggle-btn__input')) {
    renderCheckedDeliveryOption(e.target.id);
  }
};

var currentPaymentOption = payment.querySelector('.toggle-btn__input:checked').id;

initPaymentOptions(currentPaymentOption);

var renderCheckedPaymentOption = function (option) {
  if (currentPaymentOption) {
    payment.querySelector('.' + currentPaymentOption + '-wrap').classList.add('visually-hidden');
  }

  payment.querySelector('.' + option + '-wrap').classList.remove('visually-hidden');

  currentPaymentOption = option;
};

var onPaymentToggleClick = function (e) {
  if (e.target.classList.contains('toggle-btn__input')) {
    renderCheckedPaymentOption(e.target.id);
  }
};

var decreaseCartGoodAmount = function (element) {
  var goodName = getGoodNameFromCart(element);
  var goodInCart = getGoodFromArray(goodsInCart, goodName);
  var goodInStore = getGoodFromArray(randomGoods, goodName);

  if (goodInCart.orderedAmount <= 1) {
    removeGoodFromCart(element, randomGoods);
    return;
  }

  goodInCart.orderedAmount--;
  goodInStore.amount++;
};

var increaseCartGoodAmount = function (element) {
  var goodName = getGoodNameFromCart(element);
  var goodInCart = getGoodFromArray(goodsInCart, goodName);
  var goodInStore = getGoodFromArray(randomGoods, goodName);

  if (goodInStore.amount === 0) {
    return;
  }

  goodInCart.orderedAmount++;
  goodInStore.amount--;
};

var onDecreaseAmountClick = function (e) {
  if (e.target.classList.contains('card-order__btn--decrease')) {
    decreaseCartGoodAmount(e.target.closest('.card-order'));
    renderCart();
    renderGoods();
  }
};

var onIncreaseAmountClick = function (e) {
  if (e.target.classList.contains('card-order__btn--increase')) {
    increaseCartGoodAmount(e.target.closest('.card-order'));
    renderCart();
    renderGoods();
  }
};

catalog.addEventListener('click', onAddToFavoriteClick);
catalog.addEventListener('click', onAddToCartClick);
cart.addEventListener('click', onRemoveFromCartClick);
cart.addEventListener('click', onDecreaseAmountClick);
cart.addEventListener('click', onIncreaseAmountClick);
deliver.addEventListener('change', onDeliverToggleClick);
payment.addEventListener('change', onPaymentToggleClick);
