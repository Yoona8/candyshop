import AbstractComponent from './abstract-component';
import {SortType} from '../consts';

const getSortItemTemplate = (sortType, currentType = SortType.POPULAR) => {
  const isChecked = sortType === currentType ? 'checked' : '';

  return `
    <li class="input-btn">
      <input
        class="
          input-btn__input
          visually-hidden
          input-btn__input--radio"
        name="sort"
        value="${sortType}"
        type="radio"
        id="filter-${sortType}"
        ${isChecked}
      >
      <label
        class="input-btn__label input-btn__label--radio"
        for="filter-${sortType}"
      >${sortType}</label>
    </li>
  `;
};

const getSortTemplate = () => {
  const sortItemsTemplate = Object.values(SortType).map((sortType) => {
    return getSortItemTemplate(sortType);
  }).join('');

  return `
    <ul class="catalog__filter">
      ${sortItemsTemplate}
    </ul>
  `;
};

export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  _getTemplate() {
    return getSortTemplate();
  }

  _onSortTypeChange(evt) {
    evt.preventDefault();
    this._callback.change(evt.target.value);
  }

  setOnSortTypeChange(callback) {
    this._callback.change = callback;
    this.getElement().addEventListener('change', this._onSortTypeChange);
  }
}
