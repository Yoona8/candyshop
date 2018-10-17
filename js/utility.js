'use strict';

(function () {
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
        .map(function (item) {
          return (item % 2) ? item * 2 : item;
        })
        .reduce(function (acc, number) {
          return acc + (number >= 10 ? number - 9 : +number);
        }, 0);

      return sum % 10 === 0;
    }
  };
})();
