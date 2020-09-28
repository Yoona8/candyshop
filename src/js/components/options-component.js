const getOptionTemplate = (filter) => {
  const {name, count} = filter;
  const title = name.replace('-', ' ');

  return `
    <li class="input-btn">
      <input
        class="
          input-btn__input
          visually-hidden
          input-btn__input--checkbox"
        name="mark"
        value="${name}"
        type="radio"
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

export const getOptionsTemplate = (filters) => {
  const optionsTemplate = filters.map((filter) => {
    return getOptionTemplate(filter);
  }).join('');

  return `
    <ul class="catalog__filter">
      ${optionsTemplate}
    </ul>
  `;
};
