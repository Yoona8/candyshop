import {createElement} from '../helpers/common';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t create an instance with an Abstract class');
    }

    this._element = null;
  }

  _getTemplate() {
    throw new Error('Abstract method is not implemented: _getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
