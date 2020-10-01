import AbstractComponent from './abstract-component';

const getNoGoodsTemplate = () => {
  return `
    <div class="catalog__empty-filter">
      <p><b>No goods match the filters you've chosen.</b></p>
      <p>
        Try again, click
        <span class="catalog__show-all">Show all</span>
        first.
      </p>
    </div>
  `;
};

export default class NoGoodsComponent extends AbstractComponent {
  _getTemplate() {
    return getNoGoodsTemplate();
  }
}
