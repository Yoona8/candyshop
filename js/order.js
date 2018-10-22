'use strict';

(function () {
  var orderForm = document.querySelector('.buy form');

  var onEmailFieldInvalid = function (e) {
    var field = e.target;
    if (field.validity.typeMismatch) {
      field.setCustomValidity('Введите правильный e-mail');
    } else {
      field.setCustomValidity('');
    }
  };

  var emailField = orderForm.querySelector('#contact-data__email');
  emailField.addEventListener('invalid', onEmailFieldInvalid);

  var onOrderFormSubmit = function (e) {
    e.preventDefault();

    var orderData = {
      order: window.catalog.getGoodsInCart(),
      user: new FormData(orderForm)
    };

    var errorModal = document.querySelector('#modal-error');

    if (orderData.order.length === 0) {
      window.modal(errorModal, 'Корзина пуста.');
      return;
    }

    var successModal = document.querySelector('#modal-success');

    var onSuccess = function () {
      window.modal(successModal);
    };

    var onError = function (message) {
      window.modal(errorModal, message);
    };

    window.ajax.save(orderData, 'https://js.dump.academy/candyshop', onSuccess, onError);
  };

  orderForm.addEventListener('submit', onOrderFormSubmit);
})();
