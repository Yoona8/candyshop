import GoodComponent from '../components/good-component';
import {remove, render, replace} from '../helpers/common';
import {UpdateType, UserAction} from '../consts';

export default class GoodController {
  constructor(catalogElement, good, onViewChange) {
    this._catalogElement = catalogElement;
    this._good = good;
    this._changeData = onViewChange;
    this._goodComponent = new GoodComponent(this._good);

    this._onAddToCartClick = this._onAddToCartClick.bind(this);
    this._onAddToFavoritesClick = this._onAddToFavoritesClick.bind(this);
  }

  _onAddToFavoritesClick() {
    const updatedGood = Object.assign({}, this._good, {
      isFavorite: !this._good.isFavorite
    });

    this._changeData(UserAction.UPDATE_GOOD, UpdateType.PATCH, updatedGood);
  };

  _onAddToCartClick() {
    const updatedGood = Object.assign({}, this._good, {
      amount: --this._good.amount
    });
    // todo: update the cartAmount (increase)

    this._changeData(
      UserAction.ADD_GOOD_TO_CART,
      UpdateType.MINOR,
      updatedGood
    );
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
