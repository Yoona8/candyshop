import AbstractComponent from './abstract-component';

const getNoGoodsTemplate = () => {
  return `
    <div class="goods__card-empty">
      <p>We're out of goods. Sorry! Come back the other day.</p>
    </div>
  `;
};

export default class NoGoodsComponent extends AbstractComponent {
  _getTemplate() {
    return getNoGoodsTemplate();
  }
}
