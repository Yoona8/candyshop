import GoodComponent from '../components/good-component';
import {remove, render, replace} from '../helpers/common';

export default class GoodController {
  constructor(catalogElement, good, onDataChanged) {
    this._catalogElement = catalogElement;
    this._good = good;
    this._onDataChanged = onDataChanged;
    this._goodComponent = new GoodComponent(this._good);

    this._onAddToCartClick = this._onAddToCartClick.bind(this);
    this._onAddToFavoritesClick = this._onAddToFavoritesClick.bind(this);
  }

  _onAddToFavoritesClick() {
    const updatedGood = Object.assign({}, this._good, {
      isFavorite: !this._good.isFavorite
    });

    this._onDataChanged(updatedGood);
  };

  _onAddToCartClick() {
    console.log(this._good);
  };

  _setListeners() {
    this._goodComponent.setOnAddToFavoritesClick(this._onAddToFavoritesClick);
    this._goodComponent.setOnAddToCartClick(this._onAddToCartClick);
  }

  init() {
    this._setListeners();
    render(this._catalogElement, this._goodComponent);
  }

  destroy() {
    remove(this._goodComponent);
  }

  update(good) {
    this._good = good;

    const prevGoodComponent = this._goodComponent;

    this._goodComponent = new GoodComponent(this._good);
    this._setListeners();
    replace(this._goodComponent, prevGoodComponent);
  }
}
