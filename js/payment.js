'use strict';

(function () {
  var CardStatus = {
    UNDEFINED: 'Не определён',
    APPROVED: 'Одобрен'
  };

  var payment = document.querySelector('.payment');
  var card = payment.querySelector('.payment__card-wrap');
  var cardInputs = card.querySelectorAll('input');
  var cash = payment.querySelector('.payment__cash-wrap');
  var currentPaymentOption = payment.querySelector('.toggle-btn__input:checked').id;

  var initPaymentOptions = function (current) {
    card.classList.add('visually-hidden');
    cash.classList.add('visually-hidden');
    payment.querySelector('.' + current + '-wrap').classList.remove('visually-hidden');

    window.utility.toggleFields(cardInputs, currentPaymentOption === 'payment__card');
  };

  initPaymentOptions(currentPaymentOption);

  var renderCheckedPaymentOption = function (option) {
    if (currentPaymentOption) {
      payment.querySelector('.' + currentPaymentOption + '-wrap').classList.add('visually-hidden');
    }

    payment.querySelector('.' + option + '-wrap').classList.remove('visually-hidden');

    window.utility.toggleFields(cardInputs, option === 'payment__card');

    currentPaymentOption = option;
  };

  var onPaymentToggleClick = function (e) {
    if (e.target.classList.contains('toggle-btn__input')) {
      renderCheckedPaymentOption(e.target.id);
    }
  };

  payment.addEventListener('change', onPaymentToggleClick);

  var onCardFieldInvalid = function (e) {
    var field = e.target;
    var cardNumber = field.value;
    var isValid = window.utility.checkCardValidity(cardNumber);

    if (!isValid) {
      field.setCustomValidity('Введите корректный номер карты.');
    } else {
      field.setCustomValidity('');
    }
  };

  var cardField = card.querySelector('#payment__card-number');
  cardField.addEventListener('input', onCardFieldInvalid);

  var cardStatusElement = card.querySelector('.payment__card-status');

  var changeCardStatus = function () {
    cardStatusElement.textContent = CardStatus.UNDEFINED;

    for (var i = 0; i < cardInputs.length; i++) {
      if (!cardInputs[i].validity.valid) {
        return;
      }
    }

    cardStatusElement.textContent = CardStatus.APPROVED;
  };

  var onCardFieldsInput = function () {
    changeCardStatus();
  };

  card.addEventListener('keyup', onCardFieldsInput, true);
})();
