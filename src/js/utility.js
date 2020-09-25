const KeyCode = {
  ESC: 27
};

(function () {
  window.utility = {
    toggleFields: function (fields, isEnabled) {
      Array.prototype.forEach.call(fields, function (field) {
        field.disabled = !isEnabled;
      });
    },

    checkCardValidity: function (cardNumber) {
      const numbers = cardNumber.split('');

      const sum = numbers
        .map(function (item, idx) {
          return ((idx + 1) % 2) ? item * 2 : item;
        })
        .reduce(function (acc, number) {
          return acc + (number >= 10 ? number - 9 : +number);
        }, 0);

      return sum % 10 === 0;
    },

    renderErrorMessage: function (message) {
      const fragment = document.createDocumentFragment();
      const main = document.querySelector('main');
      const errorMessage = document.createElement('p');

      errorMessage.id = 'error';
      errorMessage.style.textAlign = 'center';
      errorMessage.style.fontWeight = '700';
      errorMessage.style.fontSize = '30px';
      errorMessage.style.color = 'tomato';
      errorMessage.style.lineHeight = '35px';
      errorMessage.style.margin = '100px auto';
      errorMessage.textContent = message;

      fragment.appendChild(errorMessage);

      main.textContent = '';
      main.appendChild(fragment);
    },

    onEscPress: function (e, callback) {
      if (e.keyCode === KeyCode.ESC) {
        callback();
      }
    }
  };
})();
