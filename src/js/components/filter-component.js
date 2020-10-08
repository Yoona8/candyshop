import AbstractComponent from './abstract-component';

const getFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  const title = name.replace('-', ' ');

  return `
    <li class="input-btn">
      <input
        class="
          input-btn__input
          visually-hidden
          input-btn__input--checkbox"
        name="food-type"
        value="${name}"
        type="checkbox"
        id="filter-${name}"
      >
      <label
        class="input-btn__label input-btn__label--checkbox"
        for="filter-${name}"
      >${title}</label>
      <span class="input-btn__item-count">(${count})</span>
    </li>
  `;
};

const getFilterTemplate = (filters) => {
  const filtersTemplate = filters
    .map((filter) => getFilterItemTemplate(filter))
    .join('');

  return `
    <ul class="catalog__filter">
      ${filtersTemplate}
    </ul>
  `;
};

export default class FilterComponent extends AbstractComponent {
  constructor(filters, filtersModel) {
    super();

    this._filters = filters;
    this._filtersModel = filtersModel;
  }

  _getTemplate() {
    return getFilterTemplate(this._filters);
  }

  setOnFilterChange() {
    console.log('filter changed!');
  }
}
