'use strict';

(function () {
  var modal;
  var modalClose;

  var closeModal = function () {
    modal.classList.add('modal--hidden');
    modalClose.removeEventListener('click', onModalCloseClick);
    document.removeEventListener('keydown', onModalEscPress);
    modal.removeEventListener('click', onModalOverlayClick);
  };

  var onModalCloseClick = function () {
    closeModal();
  };

  var onModalEscPress = function (e) {
    window.utility.onEscPress(e, closeModal);
  };

  var onModalOverlayClick = function (e) {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  var openModal = function (message) {
    if (message) {
      modal.querySelector('.modal__message').textContent = message;
    }
    modal.classList.remove('modal--hidden');
    modalClose.focus(true);
    modalClose.addEventListener('click', onModalCloseClick);
    document.addEventListener('keydown', onModalEscPress);
    modal.addEventListener('click', onModalOverlayClick);
  };

  window.modal = {
    init: function (modalElement, message) {
      modal = modalElement;
      modalClose = modal.querySelector('.modal__close');
      openModal(message);
    }
  };
})();
