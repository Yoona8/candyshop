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

export const getFilterTemplate = () => {
  return `
    <ul class="catalog__filter">
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-type"
          value="icecream"
          type="checkbox"
          id="filter-icecream"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-icecream"
        >Ice cream</label>
        <span class="input-btn__item-count">(7)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-type"
          value="soda"
          type="checkbox"
          id="filter-soda"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-soda"
        >Soda</label>
        <span class="input-btn__item-count">(5)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-type"
          value="gum"
          type="checkbox"
          id="filter-gum"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-gum"
        >Gum</label>
        <span class="input-btn__item-count">(6)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-type"
          value="marmalade"
          type="checkbox"
          id="filter-marmalade"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-marmalade"
        >Marmalade</label>
        <span class="input-btn__item-count">(7)</span>
      </li>
      <li class="input-btn">
        <input
          class="
            input-btn__input
            visually-hidden
            input-btn__input--checkbox"
          name="food-type"
          value="marshmallows"
          type="checkbox"
          id="filter-marshmallows"
        >
        <label
          class="input-btn__label input-btn__label--checkbox"
          for="filter-marshmallows"
        >Marshmallows</label>
        <span class="input-btn__item-count">(6)</span>
      </li>
    </ul>
  `;
};
