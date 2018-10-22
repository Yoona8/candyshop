'use strict';

(function () {
  var KeyCode = {
    ESC: 27
  };

  window.utility = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getRandomItemsFromArray: function (arr, count) {
      var totalListOfItems = arr.slice();
      var items = [];

      for (var i = 0; i < count; i++) {
        var randomIndex = window.utility.getRandomInt(0, totalListOfItems.length - 1);
        items.push(totalListOfItems[randomIndex]);
        totalListOfItems.splice(randomIndex, 1);
      }

      return items;
    },

    renderBlockOfElements: function (elements, container, callback) {
      container.textContent = '';

      var fragment = document.createDocumentFragment();

      elements.forEach(function (element) {
        fragment.appendChild(callback(element));
      });

      container.appendChild(fragment);
    },

    toggleFields: function (fields, isEnabled) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = !isEnabled;
      }
    },

    checkCardValidity: function (cardNumber) {
      var numbers = cardNumber.split('');

      var sum = numbers
        .map(function (item, idx) {
          return (idx % 2) ? item * 2 : item;
        })
        .reduce(function (acc, number) {
          return acc + (number >= 10 ? number - 9 : +number);
        }, 0);

      return sum % 10 === 0;
    },

    renderErrorMessage: function (message) {
      var fragment = document.createDocumentFragment();
      var main = document.querySelector('main');
      var errorMessage = document.createElement('p');

      errorMessage.id = 'error';
      errorMessage.style.textAlign = 'center';
      errorMessage.style.fontWeight = 700;
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
