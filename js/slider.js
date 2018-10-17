'use strict';

(function () {
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
  var rangeMaxControlX = rangeMaxControl.getBoundingClientRect().x;
  var rangeMinControlX = rangeMinControl.getBoundingClientRect().x;

  var renderSlider = function (x, control) {
    var moveX = x - rangeBarCoordinates.x;
    var percentage = 100 * moveX / limits;
    var controlPosition = (moveX >= limits - rangeControlWidth) ? limits - rangeControlWidth : moveX;
    var rangeBarFilledCorrection = 2;

    if (control === 'min') {
      rangeMinControl.style.left = (controlPosition) + 'px';
      rangeBarFilled.style.left = (controlPosition + rangeControlWidth - rangeBarFilledCorrection) + 'px';
      rangeMinOutput.textContent = Math.round(percentage);
    } else {
      rangeMaxControl.style.left = (controlPosition) + 'px';
      rangeBarFilled.style.right = (limits - controlPosition - rangeBarFilledCorrection) + 'px';
      rangeMaxOutput.textContent = Math.round(percentage);
    }
  };

  renderSlider(rangeMaxControlX, 'max');
  renderSlider(rangeMinControlX, 'min');

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
})();
