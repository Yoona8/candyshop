const otherFilterTemplate = () => {
  return `
    <ul class="catalog__filter">
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-property"
          value="sugar-free"
          type="checkbox"
          id="filter-sugar-free"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-sugar-free"
        >Sugar free</label>
        <span class="input-btn__item-count">(5)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-property"
          value="vegetarian"
          type="checkbox"
          id="filter-vegetarian"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-vegetarian"
        >Vegetarian</label>
        <span class="input-btn__item-count">(0)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-property"
          value="gluten-free"
          type="checkbox"
          id="filter-gluten-free"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-gluten-free"
        >Gluten free</label>
        <span class="input-btn__item-count">(3)</span>
      </li>
    </ul>
  `;
};

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

export const getFilterTemplate = (filters) => {
  const filtersTemplate = filters
    .map((filter) => getFilterItemTemplate(filter))
    .join('');

  return `
    <ul class="catalog__filter">
      ${filtersTemplate}
    </ul>
  `;
};
