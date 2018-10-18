'use strict';

(function () {
  var MODIFIERS = [
    'one',
    'two',
    'three',
    'four',
    'five'
  ];

  var getBasedOnAmountClass = function (amount) {
    var amountClass = 'card--little';

    if (amount > 5) {
      amountClass = 'card--in-stock';
    } else if (amount === 0) {
      amountClass = 'card--soon';
    }

    return amountClass;
  };

  var getRatingModifier = function (rating) {
    return MODIFIERS[rating - 1];
  };

  var getNutritionSugarMessage = function (isSugar) {
    return isSugar ? 'Содержит сахар' : 'Без сахара';
  };

  var goodTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var cartGoodTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  window.goods = {
    getGoodsElement: function (good) {
      var goodElement = goodTemplate.cloneNode(true);
      goodElement.classList.add(getBasedOnAmountClass(good.amount));
      goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
      goodElement.querySelector('.card__title').textContent = good.name;
      goodElement.querySelector('.card__characteristic').textContent = getNutritionSugarMessage(good.nutritionFacts.sugar) + '. ' + good.nutritionFacts.energy + ' ккал';
      goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents + '.';

      var goodRatingElement = goodElement.querySelector('.stars__rating');
      var goodRatingClass = 'stars__rating';
      goodRatingElement.classList = '';
      goodRatingElement.classList.add(goodRatingClass);
      goodRatingElement.classList.add(goodRatingClass + '--' + getRatingModifier(good.rating.value));
      goodRatingElement.textContent = 'Рейтинг: ' + good.rating.value + ' звёзд';

      var goodPriceElement = goodElement.querySelector('.card__price');
      var goodCurrencyElement = goodPriceElement.querySelector('.card__currency');
      var goodWeightElement = goodPriceElement.querySelector('.card__weight');
      goodWeightElement.textContent = '/ ' + good.weight + ' Г';
      goodPriceElement.textContent = good.price + ' ';
      goodPriceElement.appendChild(goodCurrencyElement);
      goodPriceElement.appendChild(goodWeightElement);

      var goodImageElement = goodElement.querySelector('.card__img');
      goodImageElement.src = good.image;
      goodImageElement.alt = good.name;

      return goodElement;
    },

    getCartElement: function (good) {
      var cartElement = cartGoodTemplate.cloneNode(true);

      cartElement.querySelector('.card-order__title').textContent = good.name;
      cartElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
      cartElement.querySelector('.card-order__count').value = good.orderedAmount;

      var cartImageElement = cartElement.querySelector('.card-order__img');

      cartImageElement.src = good.image;
      cartImageElement.alt = good.name;

      return cartElement;
    }
  };
})();
