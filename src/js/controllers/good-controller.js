import GoodComponent from '../components/good-component';
import {render} from '../helpers/common';

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

  init() {
    this._goodComponent.setOnAddToFavoritesClick(this._onAddToFavoritesClick);
    this._goodComponent.setOnAddToCartClick(this._onAddToCartClick);
    render(this._catalogElement, this._goodComponent);
  }
}
