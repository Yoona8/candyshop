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
})();
