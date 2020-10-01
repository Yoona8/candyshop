import AbstractComponent from './abstract-component';

const getLoadMoreTemplate = () => {
  return `<a class="catalog__btn-more" href="#">Load 6 more</a>`;
};

export default class LoadMoreComponent extends AbstractComponent {
  _getTemplate() {
    return getLoadMoreTemplate();
  }
}
