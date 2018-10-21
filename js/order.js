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
    var errorModalClose = errorModal.querySelector('.modal__close');

    var openErrorModal = function (message) {
      errorModal.querySelector('.modal__message').textContent = message;
      errorModal.classList.remove('modal--hidden');
      errorModalClose.addEventListener('click', onErrorModalCloseClick);
      document.addEventListener('keydown', onErrorModalEscPress);
      errorModal.addEventListener('click', onErrorModalOverlayClick);
    };

    var closeErrorModal = function () {
      errorModal.classList.add('modal--hidden');
      errorModalClose.removeEventListener('click', onErrorModalCloseClick);
      document.removeEventListener('keydown', onErrorModalEscPress);
    };

    var onErrorModalCloseClick = function () {
      closeErrorModal();
    };

    var onErrorModalOverlayClick = function (evt) {
      if (evt.target.classList.contains('modal')) {
        closeErrorModal();
      }
    };

    var onErrorModalEscPress = function (evt) {
      window.utility.onEscPress(evt, closeErrorModal);
    };

    if (orderData.order.length === 0) {
      openErrorModal('Корзина пуста.');
      return;
    }

    var successModal = document.querySelector('#modal-success');
    var successModalClose = successModal.querySelector('.modal__close');

    var closeSuccessModal = function () {
      successModal.classList.add('modal--hidden');
      document.removeEventListener('keydown', onSuccessModalEscPress);
      successModal.removeEventListener('click', onOverlayClick);
      successModalClose.removeEventListener('click', onSuccessModalCloseClick);
    };

    var onSuccessModalEscPress = function (evt) {
      window.utility.onEscPress(evt, closeSuccessModal);
    };

    var onOverlayClick = function (evt) {
      if (evt.target.classList.contains('modal')) {
        closeSuccessModal();
      }
    };

    var onSuccessModalCloseClick = function () {
      closeSuccessModal();
    };

    var openSuccessModal = function () {
      successModal.classList.remove('modal--hidden');
      document.addEventListener('keydown', onSuccessModalEscPress);
      successModal.addEventListener('click', onOverlayClick);
      successModalClose.addEventListener('click', onSuccessModalCloseClick);
    };

    var onSuccess = function () {
      openSuccessModal();
    };

    var onError = function (message) {
      openErrorModal(message);
    };

    window.ajax.save(orderData, 'https://js.dump.academy/candyshop', onSuccess, onError);
  };

  orderForm.addEventListener('submit', onOrderFormSubmit);
})();
