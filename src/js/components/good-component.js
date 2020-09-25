export const getGoodTemplate = () => {
  return `
    <article class="catalog__card card card--in-stock">
      <header class="card__header">
        <h3 class="card__title">Garlic cream</h3>
        <img
          class="card__img"
          src="assets/img/cards/ice-garlic.jpg"
          alt="Garlic cream" width="265" height="264"
        >
        <span class="card__price">
          230 <span class="card__currency">$</span>
          <span class="card__weight">/ 70 g</span>
        </span>
      </header>
      <div class="card__main">
        <div class="card__rating">
          <button class="card__btn-composition" type="button">Contents</button>
          <div class="card__stars stars">
            <span class="stars__rating stars__rating--five">
              Rating: 5 stars
            </span>
            <span class="star__count">(300)</span>
          </div>
        </div>
        <div class="card__composition card__composition--hidden">
          <p class="card__characteristic">Sugar free. 133 kcal</p>
          <p class="card__composition-list">
            Milk, cream, garlic.
          </p>
        </div>
        <p class="card__btns-wrap">
          <a class="card__btn-favorite" href="#">To favorites</a>
          <a class="card__btn" href="#">Add +1</a>
        </p>
      </div>
    </article>
  `;
};
