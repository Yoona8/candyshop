(function () {
  var IMG_PATH = './img/cards/';

  window.goods = {
    getCartElement: function (good) {
      var cartElement = cartGoodTemplate.cloneNode(true);

      cartElement.querySelector('.card-order__title').textContent = good.name;
      cartElement.querySelector('.card-order__price').textContent = good.price + ' ₽';
      cartElement.querySelector('.card-order__count').value = good.orderedAmount;

      var cartImageElement = cartElement.querySelector('.card-order__img');

      cartImageElement.src = IMG_PATH + good.picture;
      cartImageElement.alt = good.name;

      return cartElement;
    }
  };
})();
