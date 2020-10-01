import {StorageLoad} from '../consts';
import AbstractComponent from './abstract-component';

const RATING_MODIFIERS = [
  'one',
  'two',
  'three',
  'four',
  'five'
];

const getAmountClassName = (amount) => {
  if (amount >= StorageLoad.ENOUGH) {
    return 'card--in-stock';
  } else if (amount === StorageLoad.EMPTY) {
    return 'card--soon';
  } else {
    return 'card--little';
  }
};

const getGoodTemplate = (good) => {
  const {
    isFavorite,
    name,
    image,
    rating,
    price,
    weight,
    amount,
    nutritionFacts
  } = good;
  const amountClassName = getAmountClassName(amount);
  const sugarMessage = nutritionFacts.isSugar ? '' : 'Sugar free.';
  const favoriteClassName = isFavorite ? 'card__btn-favorite--selected' : '';
  const ratingModifier = RATING_MODIFIERS[rating.value - 1];
  const contents = [...nutritionFacts.contents];
  const contentsMessage = contents.length > 0
    ? `${contents.join(', ')}.`
    : '';

  return `
    <article class="catalog__card card ${amountClassName}">
      <header class="card__header">
        <h3 class="card__title">${name}</h3>
        <img
          class="card__img"
          src="assets/img/cards/${image}"
          alt="${name}" width="265" height="264"
        >
        <span class="card__price">
          <span class="card__currency">$</span>${price}
          <span class="card__weight">/ ${weight} g</span>
        </span>
      </header>
      <div class="card__main">
        <div class="card__rating">
          <button class="card__btn-composition" type="button">
            Contents
          </button>
          <div class="card__stars stars">
            <span class="stars__rating stars__rating--${ratingModifier}">
              Rating: ${rating.value} stars
            </span>
            <span class="star__count">(${rating.number})</span>
          </div>
        </div>
        <div class="card__composition card__composition--hidden">
          <p class="card__characteristic">
            ${sugarMessage} ${nutritionFacts.energy} kcal
          </p>
          <p class="card__composition-list">
            ${contentsMessage}
          </p>
        </div>
        <p class="card__btns-wrap">
          <a
            class="card__btn-favorite ${favoriteClassName}"
            href="#"
          >To favorites</a>
          <a class="card__btn" href="#">Add +1</a>
        </p>
      </div>
    </article>
  `;
};

export default class GoodComponent extends AbstractComponent {
  constructor(good) {
    super();

    this._good = good;
  }

  _getTemplate() {
    return getGoodTemplate(this._good);
  }
}
