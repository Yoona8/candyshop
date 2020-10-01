import AbstractComponent from './abstract-component';

const getLoadMoreTemplate = () => {
  return `<a class="catalog__btn-more" href="#">Load 6 more</a>`;
};

export default class LoadMoreComponent extends AbstractComponent {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _getTemplate() {
    return getLoadMoreTemplate();
  }

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setOnClick(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._onClick);
  }
}
