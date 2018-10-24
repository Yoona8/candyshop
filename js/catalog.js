'use strict';

(function () {
  var catalog = document.querySelector('.catalog__cards');
  var catalogLoad = catalog.querySelector('.catalog__load');
  var goods = [];

  var renderGoods = function () {
    catalog.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');

    window.utility.renderBlockOfElements(goods, catalog, window.goods.getGoodsElement);
  };

  var onSuccess = function (data) {
    goods = data;
    window.filter.init(goods);
    renderGoods();
  };

  window.ajax.load('https://js.dump.academy/candyshop/data', onSuccess, window.utility.renderErrorMessage);

  var cart = document.querySelector('.goods__cards');
  var cartEmptyElement = cart.querySelector('.goods__card-empty');
  var cartEmptyElementCopy = cartEmptyElement.cloneNode(true);
  var goodsInCart = [];
  var goodsInCartLink = document.querySelector('.main-header__basket');

  var renderCart = function () {
    var goodsInCartCount = goodsInCart.length;

    if (goodsInCartCount === 0) {
      cart.textContent = '';
      cart.classList.add('goods__cards--empty');
      cart.appendChild(cartEmptyElementCopy);

      cartEmptyElement.classList.remove('visually-hidden');

      goodsInCartLink.textContent = 'В корзине ничего нет';

      return;
    }

    var totalPrice = goodsInCart.reduce(function (acc, current) {
      return acc + (current.orderedAmount * current.price);
    }, 0);

    window.utility.renderBlockOfElements(goodsInCart, cart, window.goods.getCartElement);

    cart.classList.remove('goods__cards--empty');

    cartEmptyElement.classList.add('visually-hidden');

    goodsInCartLink.textContent = 'В корзине ' + goodsInCartCount + ' товара на ' + totalPrice + '₽';
  };

  renderCart();

  var getGoodFromArray = function (arrayOfGoods, goodName) {
    return arrayOfGoods.find(function (item) {
      return item.name === goodName;
    });
  };

  var addGoodToCart = function (element, goodsInStore) {
    var goodName = element.querySelector('.card__title').textContent;
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
        picture: goodInStore.picture,
        price: goodInStore.price
      }));
    }
  };

  var onAddToCartClick = function (e) {
    if (e.target.classList.contains('card__btn')) {
      e.preventDefault();
      addGoodToCart(e.target.closest('.catalog__card'), goods);
      renderCart();
      renderGoods();
    }
  };

  catalog.addEventListener('click', onAddToCartClick);

  var getGoodNameFromCart = function (element) {
    return element.querySelector('.card-order__title').textContent;
  };

  var removeGoodFromCart = function (element, goodsInStore) {
    var goodName = getGoodNameFromCart(element);
    var goodInCart = getGoodFromArray(goodsInCart, goodName);
    var goodInCartIndex = goodsInCart.indexOf(goodInCart);

    goodsInCart.splice(goodInCartIndex, 1);

    var goodInStore = getGoodFromArray(goodsInStore, goodName);

    goodInStore.amount += goodInCart.orderedAmount;
  };

  var onRemoveFromCartClick = function (e) {
    if (e.target.classList.contains('card-order__close')) {
      e.preventDefault();
      removeGoodFromCart(e.target.closest('.card-order'), goods);
      renderCart();
      renderGoods();
    }
  };

  cart.addEventListener('click', onRemoveFromCartClick);

  var decreaseCartGoodAmount = function (element) {
    var goodName = getGoodNameFromCart(element);
    var goodInCart = getGoodFromArray(goodsInCart, goodName);
    var goodInStore = getGoodFromArray(goods, goodName);

    if (goodInCart.orderedAmount <= 1) {
      removeGoodFromCart(element, goods);
      return;
    }

    goodInCart.orderedAmount--;
    goodInStore.amount++;
  };

  var onDecreaseAmountClick = function (e) {
    if (e.target.classList.contains('card-order__btn--decrease')) {
      decreaseCartGoodAmount(e.target.closest('.card-order'));
      renderCart();
      renderGoods();
    }
  };

  cart.addEventListener('click', onDecreaseAmountClick);

  var increaseCartGoodAmount = function (element) {
    var goodName = getGoodNameFromCart(element);
    var goodInCart = getGoodFromArray(goodsInCart, goodName);
    var goodInStore = getGoodFromArray(goods, goodName);

    if (goodInStore.amount === 0) {
      return;
    }

    goodInCart.orderedAmount++;
    goodInStore.amount--;
  };

  var onIncreaseAmountClick = function (e) {
    if (e.target.classList.contains('card-order__btn--increase')) {
      increaseCartGoodAmount(e.target.closest('.card-order'));
      renderCart();
      renderGoods();
    }
  };

  cart.addEventListener('click', onIncreaseAmountClick);

  window.catalog = {
    getGoodsInCart: function () {
      return goodsInCart;
    }
  };
})();
