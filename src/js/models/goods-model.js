export default class GoodsModel {
  constructor() {
    this._goods = [];
  }

  setGoods(goods) {
    this._goods = goods.slice();
  }

  getGoods() {
    return this._goods;
  }

  updateGood(updatedGood) {
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
  }
}
