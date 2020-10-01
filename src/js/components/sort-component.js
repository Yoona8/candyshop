import AbstractComponent from './abstract-component';

const getSortTemplate = () => {
  return `
    <ul class="catalog__filter">
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--radio"
          name="sort"
          value="popular"
          type="radio"
          id="filter-popular"
          checked
        >
        <label
          class="input-btn__label input-btn__label--radio"
          for="filter-popular"
        >Popular</label>
      </li>

      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--radio"
          name="sort"
          value="expensive"
          type="radio"
          id="filter-expensive"
        >
        <label
          class="input-btn__label input-btn__label--radio"
          for="filter-expensive"
        >Price highest</label>
      </li>

      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--radio"
          name="sort"
          value="cheep"
          type="radio"
          id="filter-cheep"
        >
        <label
          class="input-btn__label input-btn__label--radio"
          for="filter-cheep"
        >Price lowest</label>
      </li>

      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--radio"
          name="sort"
          value="rating"
          type="radio"
          id="filter-rating"
        >
        <label
          class="input-btn__label input-btn__label--radio"
          for="filter-rating"
        >By rating</label>
      </li>
    </ul>
  `;
};

export default class SortComponent extends AbstractComponent {
  _getTemplate() {
    return getSortTemplate();
  }
}
