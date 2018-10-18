'use strict';

(function () {
  var catalog = document.querySelector('.catalog__cards');

  var onAddToFavoriteClick = function (e) {
    if (e.target.classList.contains('card__btn-favorite')) {
      e.preventDefault();
      e.target.classList.toggle('card__btn-favorite--selected');
    }
  };

  catalog.addEventListener('click', onAddToFavoriteClick);
})();
