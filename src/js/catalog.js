'use strict';

import {render} from './helpers/common';
import {getGoodCartTemplate} from './components/good-cart-component';

(function () {
  var catalog = document.querySelector('.catalog__cards');
  // var catalogLoad = catalog.querySelector('.catalog__load');
  var goods = [];
  var sortedGoods = [];

  var getMinMaxPrice = function (listOfGoods) {
    var prices = listOfGoods.map(function (good) {
      return good.price;
    });

    var sortedPrices = prices.sort(function (a, b) {
      return a - b;
    });

    return {
      min: sortedPrices[0],
      max: sortedPrices[sortedPrices.length - 1]
    };
  };

  var emptyFiltersTemplate = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');

  var renderEmptyFilters = function () {
    var emptyElement = emptyFiltersTemplate.cloneNode(true);
    catalog.appendChild(emptyElement);
  };

  const renderGoods = function () {
    // sortedGoods.forEach((good) => {
    //   render(catalog, getGoodTemplate());
    // });

    if (sortedGoods.length === 0) {
      renderEmptyFilters();
    }
  };

  var filterForm = document.querySelector('.catalog__sidebar form');
  var filterInputs = filterForm.querySelectorAll('input');
  var filtersByFoodTypes = filterForm.querySelectorAll('input[name="food-type"]');
  var filtersByNutritionFacts = filterForm.querySelectorAll('input[name="food-property"]');
  var filtersByOtherParams = filterForm.querySelectorAll('input[name="mark"]');
  var sortingFilters = filterForm.querySelectorAll('input[name="sort"]');

  var resetFilters = function (filterElements) {
    Array.prototype.forEach.call(filterElements, (function (element) {
      element.checked = false;
    }));
  };

  var initCatalog = function () {
    // catalog.classList.remove('catalog__cards--load');
    // catalogLoad.classList.add('visually-hidden');
    window.filter.init(goods);
    resetFilters(filterInputs);
    renderGoods();
    window.slider.init(getMinMaxPrice(sortedGoods));
  };

  var getSetOfFilters = function (elements) {
    return Array.prototype.filter.call(elements, (function (element) {
      return element.checked;
    })).map(function (element) {
      return element.id;
    });
  };

  var getFilters = function () {
    var appliedFilters = {
      foodTypes: getSetOfFilters(filtersByFoodTypes),
      nutritionFacts: getSetOfFilters(filtersByNutritionFacts),
      prices: window.slider.getPrices(),
      other: getSetOfFilters(filtersByOtherParams),
      sorting: getSetOfFilters(sortingFilters)
    };

    return appliedFilters;
  };

  var onSuccess = function (data) {
    goods = data;
    sortedGoods = data;
    initCatalog();
  };

  var onFilterChange = function (e) {
    if (e.target.name === 'mark') {
      resetFilters(filtersByFoodTypes);
      resetFilters(filtersByNutritionFacts);
      window.slider.init(getMinMaxPrice(goods));
    } else {
      resetFilters(filtersByOtherParams);
    }

    sortedGoods = window.filter.getFilteredGoods(getFilters(), goods);
    renderGoods();
  };

  var onPriceControlMousedown = function (e) {
    if (e.target.classList.contains('range__btn')) {
      var onMouseup = function () {
        sortedGoods = window.filter.getFilteredGoods(getFilters(), goods);
        window.filter.updatePriceQuantity(sortedGoods.length);
        renderGoods();

        document.removeEventListener('mouseup', onMouseup);
      };

      document.addEventListener('mouseup', onMouseup);
    }
  };

  var onShowAllButtonClick = function (e) {
    e.preventDefault();
    resetFilters(filterInputs);
    sortedGoods = goods;
    window.slider.init(getMinMaxPrice(sortedGoods));
    window.filter.updatePriceQuantity(sortedGoods.length);
    renderGoods();
  };

  var showAllButton = filterForm.querySelector('.catalog__submit');
  var cart = document.querySelector('.goods__cards');
  var cartEmptyElement = cart.querySelector('.goods__card-empty');
  var cartEmptyElementCopy = cartEmptyElement.cloneNode(true);
  var goodsInCart = [];
  var goodsInCartLink = document.querySelector('.main-header__basket');
  var orderForm = document.querySelector('.buy form');
  var orderFormElements = orderForm.querySelectorAll('input:not([disabled]), button[type="submit"]');

  var renderFullCart = function (goodsInCartCount) {
    var totalPrice = goodsInCart.reduce(function (acc, current) {
      return acc + (current.orderedAmount * current.price);
    }, 0);

    goodsInCart.forEach(() => {
      render(cart, getGoodCartTemplate());
    });
    window.payment.updateOptions();

    cart.classList.remove('goods__cards--empty');

    cartEmptyElement.classList.add('visually-hidden');

    goodsInCartLink.textContent = 'В корзине ' + goodsInCartCount + ' товара на ' + totalPrice + '₽';
  };

  var renderEmptyCart = function () {
    cart.textContent = '';
    cart.classList.add('goods__cards--empty');
    cart.appendChild(cartEmptyElementCopy);

    cartEmptyElement.classList.remove('visually-hidden');

    goodsInCartLink.textContent = 'В корзине ничего нет';
  };

  var renderCart = function () {
    var goodsInCartCount = goodsInCart.length;
    window.utility.toggleFields(orderFormElements, goodsInCartCount !== 0);

    if (goodsInCartCount === 0) {
      renderEmptyCart();
      return;
    }

    renderFullCart(goodsInCartCount);
  };

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

  var addToFavorite = function (element) {
    element.classList.toggle('card__btn-favorite--selected');
    var goodName = element.closest('.card').querySelector('.card__title').textContent;
    var goodInStore = getGoodFromArray(goods, goodName);
    goodInStore.favorite = element.classList.contains('card__btn-favorite--selected');
    window.filter.updateFavoriteQuantity(goodInStore);
    sortedGoods = window.filter.getFilteredGoods(getFilters(), goods);
    renderGoods();
  };

  var onAddToFavoriteClick = function (e) {
    if (e.target.classList.contains('card__btn-favorite')) {
      e.preventDefault();
      addToFavorite(e.target);
    }
  };

  window.ajax.load('https://js.dump.academy/candyshop/data', onSuccess, window.utility.renderErrorMessage);
  filterForm.addEventListener('change', onFilterChange, true);
  filterForm.addEventListener('mousedown', onPriceControlMousedown, true);
  showAllButton.addEventListener('click', onShowAllButtonClick);
  renderCart();
  // catalog.addEventListener('click', onAddToCartClick);
  // catalog.addEventListener('click', onAddToFavoriteClick);
  cart.addEventListener('click', onRemoveFromCartClick);
  cart.addEventListener('click', onDecreaseAmountClick);
  cart.addEventListener('click', onIncreaseAmountClick);

  window.catalog = {
    getGoodsInCart: function () {
      return goodsInCart;
    },

    clearCart: function () {
      goodsInCart = [];
      renderCart();
    }
  };
})();
