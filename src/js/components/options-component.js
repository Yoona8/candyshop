export const getOptionsTemplate = () => {
  return `
    <ul class="catalog__filter">
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="mark"
          value="favorite"
          type="radio"
          id="filter-favorite"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-favorite"
        >Favorites</label>
        <span class="input-btn__item-count">(7)</span>
      </li>

      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="mark"
          value="availability"
          type="radio"
          id="filter-availability"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-availability"
        >In stock</label>
        <span class="input-btn__item-count">(7)</span>
      </li>
    </ul>
  `;
};
