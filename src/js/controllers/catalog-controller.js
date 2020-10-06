import {render, remove} from '../helpers/common';
import CatalogComponent from '../components/catalog-component';
import GoodController from './good-controller';
import LoadMoreComponent from '../components/load-more-component';
import NoGoodsComponent from '../components/no-goods-component';

const GOODS_COUNT_STEP = 6;

export default class CatalogController {
  constructor(catalogContainerElement, goodsModel) {
    this._catalogContainerElement = catalogContainerElement;
    this._goodsModel = goodsModel;

    this._goods = [];
    this._renderedGoodsCount = GOODS_COUNT_STEP;

    this._catalogComponent = new CatalogComponent();
    this._noGoodsComponent = new NoGoodsComponent();
    this._loadMoreComponent = new LoadMoreComponent();

    this._onLoadMoreClick = this._onLoadMoreClick.bind(this);
  }

  _onDataChange(updatedGood) {
    this._goodsModel.updateGood(updatedGood);
  };

  _renderGood(good) {
    const goodController = new GoodController(
      this._catalogComponent.getElement(),
      good,
      this._onDataChange
    );

    goodController.init();
  };

  _renderGoods(from, to) {
    this._goods.slice(from, to).forEach((good) => {
      this._renderGood(good);
    });
  }

  _renderNoGoods() {
    render(this._catalogContainerElement, this._noGoodsComponent);
  }

  _renderCatalog() {
    if (this._goods.length === 0) {
      this._renderNoGoods();
      return;
    }

    this._renderGoods(0, GOODS_COUNT_STEP);

    if (this._goods.length > GOODS_COUNT_STEP) {
      this._renderLoadMore();
    }
  }

  _onLoadMoreClick() {
    this._renderGoods(
      this._renderedGoodsCount,
      this._renderedGoodsCount + GOODS_COUNT_STEP
    );

    this._renderedGoodsCount += GOODS_COUNT_STEP;

    if (this._renderedGoodsCount >= this._goods.length) {
      remove(this._loadMoreComponent);
    }
  };

  _renderLoadMore() {
    render(this._catalogContainerElement, this._loadMoreComponent);
    this._loadMoreComponent.setOnClick(this._onLoadMoreClick);
  }

  init() {
    this._goods = this._goodsModel.getGoods();
    render(this._catalogContainerElement, this._catalogComponent);
    this._renderCatalog();
  }
}
