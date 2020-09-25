export const getGoodCartTemplate = () => {
  return `
    <article class="goods_card card-order">
      <a href="#" class="card-order__close">Remove</a>
      <header class="card-order__header">
        <h3 class="card-order__title">Wasabi gum</h3>
        <img
          src="assets/img/cards/gum-wasabi.jpg"
          alt="Wasabi gum"
          class="card-order__img" width="265" height="264">
      </header>
      <div class="card-order__main">
        <p class="card-order__price">$660</p>
        <div class="card-order__amount">
          <button
            type="button"
            class="card-order__btn card-order__btn--decrease"
          >decrease</button>
          <label class="card-order__label">
            <span class="visually-hidden">Amount</span>
            <input
              class="card-order__count"
              name="gum-wasabi"
              value="2"
              type="text"
              id="card-order__gum-wasabi"
            >
          </label>
          <button
            type="button"
            class="card-order__btn card-order__btn--increase"
          >increase</button>
        </div>
      </div>
    </article>
  `;
};
