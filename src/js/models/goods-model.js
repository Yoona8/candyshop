import Observable from '../helpers/observable';

export default class GoodsModel extends Observable {
  constructor() {
    super();

    this._goods = [];
  }

  setGoods(goods) {
    this._goods = goods.slice();
  }

  getGoods() {
    return this._goods;
  }

  updateGood(updateType, updatedGood) {
    const index = this._goods.findIndex((good) => {
      return good.id === updatedGood.id;
    });

    if (index === -1) {
      throw new Error('Can\'t update nonexistent good.');
    }

    this._goods = [
      ...this._goods.slice(0, index),
      updatedGood,
      ...this._goods.slice(index + 1)
    ];

    this._notify(updateType, updatedGood);
  }
}
