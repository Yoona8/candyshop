import {render, remove} from '../helpers/common';
import CatalogComponent from '../components/catalog-component';
import GoodController from './good-controller';
import LoadMoreComponent from '../components/load-more-component';
import NoGoodsComponent from '../components/no-goods-component';
import {UpdateType, UserAction} from '../consts';

const GOODS_COUNT_STEP = 6;

export default class CatalogController {
  constructor(catalogContainerElement, goodsModel) {
    this._catalogContainerElement = catalogContainerElement;
    this._goodsModel = goodsModel;

    this._goods = [];
    this._renderedGoodsCount = GOODS_COUNT_STEP;
    this._goodController = {};

    this._catalogComponent = new CatalogComponent();
    this._noGoodsComponent = new NoGoodsComponent();
    this._loadMoreComponent = new LoadMoreComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreClick = this._onLoadMoreClick.bind(this);
  }

  _onDataChange(updateType, update) {
    console.log(updateType, update);
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.MINOR:
        this._goodController[update.id].update(update);
        break;
      case UpdateType.MAJOR:
        console.log('Render the whole list of goods');
        break;
    }
  };

  _onViewChange(userAction, updateType, update) {
    switch (userAction) {
      case UserAction.UPDATE_GOOD:
      case UserAction.ADD_GOOD_TO_CART:
        this._goodsModel.updateGood(updateType, update);
        break;
    }
  }

  _renderGood(good) {
    const goodController = new GoodController(
      this._catalogComponent.getElement(),
      good,
      this._onViewChange
    );

    goodController.init();
    this._goodController[good.id] = goodController;
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

  _clearCatalog() {
    Object.values(this._goodController).forEach((controller) => {
      controller.destroy();
    });

    this._renderedGoodsCount = GOODS_COUNT_STEP;
  }

  init() {
    render(this._catalogContainerElement, this._catalogComponent);
    this._goods = this._goodsModel.getGoods();

    this._goodsModel.addObserver(this._onDataChange);

    this._renderCatalog();
  }

  update(goods) {
    this._goods = goods;
    this._clearCatalog();
    this._renderCatalog();
  }
}
