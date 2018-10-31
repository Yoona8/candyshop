'use strict';

(function () {
  var prices = {
    min: 25,
    max: 90
  };

  var rangeSlider = document.querySelector('.range');
  var rangeBar = rangeSlider.querySelector('.range__filter');
  var rangeBarCoordinates = rangeBar.getBoundingClientRect();
  var rangeMinOutput = rangeSlider.querySelector('.range__price--min');
  var rangeMaxOutput = rangeSlider.querySelector('.range__price--max');
  var rangeMinControl = rangeBar.querySelector('.range__btn--left');
  var rangeMaxControl = rangeBar.querySelector('.range__btn--right');
  var rangeBarFilled = rangeBar.querySelector('.range__fill-line');
  var rangeControlWidth = rangeMaxControl.offsetWidth;
  var limits = rangeBarCoordinates.width;

  var getPrice = function (percentage) {
    var priceRange = prices.max - prices.min;
    var priceToRender = prices.min + (percentage * priceRange);

    if (percentage <= 0) {
      priceToRender = prices.min;
    }

    if (percentage >= 1) {
      priceToRender = prices.max;
    }

    return priceToRender;
  };

  var renderSlider = function (x, control) {
    var moveX = x - rangeBarCoordinates.left;
    var percentage = moveX / (limits - rangeControlWidth);
    var priceToRender = getPrice(percentage);

    var controlPosition = (moveX >= limits - rangeControlWidth) ? limits - rangeControlWidth : moveX;
    var rangeBarFilledCorrection = 2;

    if (control === 'min') {
      rangeMinControl.style.left = (controlPosition) + 'px';
      rangeBarFilled.style.left = (controlPosition + rangeControlWidth - rangeBarFilledCorrection) + 'px';
      rangeMinOutput.textContent = Math.round(priceToRender);
    } else {
      rangeMaxControl.style.left = (controlPosition) + 'px';
      rangeBarFilled.style.right = (limits - controlPosition - rangeBarFilledCorrection) + 'px';
      rangeMaxOutput.textContent = Math.round(priceToRender);
    }
  };

  var onRangeControlMousedown = function (e) {
    var control = e.target.classList.contains('range__btn--left') ? 'min' : 'max';
    var maxCoordinate = rangeMaxControl.getBoundingClientRect().x;
    var minCoordinate = rangeMinControl.getBoundingClientRect().x;

    var onMousemove = function (eMove) {
      var moveX = eMove.clientX;

      var isValidRange = (control === 'min') ?
        (moveX >= rangeBarCoordinates.x && moveX <= maxCoordinate) :
        (moveX <= rangeBarCoordinates.right && moveX >= minCoordinate);

      if (!isValidRange) {
        return;
      }

      renderSlider(moveX, control);
    };

    var onMouseup = function () {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  rangeMinControl.addEventListener('mousedown', onRangeControlMousedown);
  rangeMaxControl.addEventListener('mousedown', onRangeControlMousedown);

  window.slider = {
    init: function (numbers) {
      prices.min = numbers.min;
      prices.max = numbers.max;

      renderSlider(rangeBarCoordinates.left, 'min');
      renderSlider(rangeBarCoordinates.right, 'max');
    },

    getPrices: function () {
      return {
        min: +rangeMinOutput.textContent,
        max: +rangeMaxOutput.textContent
      };
    }
  };
})();
