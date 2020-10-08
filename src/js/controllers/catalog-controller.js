import {render, remove} from '../helpers/common';
import CatalogComponent from '../components/catalog-component';
import GoodController from './good-controller';
import LoadMoreComponent from '../components/load-more-component';
import NoGoodsComponent from '../components/no-goods-component';
import {SortType, UpdateType, UserAction} from '../consts';

const GOODS_COUNT_STEP = 6;

export default class CatalogController {
  constructor(catalogContainerElement, goodsModel, filtersModel) {
    this._catalogContainerElement = catalogContainerElement;
    this._goodsModel = goodsModel;
    this._filtersModel = filtersModel;

    this._goods = [];
    this._sortType = SortType.POPULAR;
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

  _sortGoods(goods) {
    switch (this._sortType) {
      case SortType.PRICE_HIGH:
        return goods.sort((a, b) => b.price - a.price);
      case SortType.PRICE_LOW:
        return goods.sort((a, b) => a.price - b.price);
      case SortType.RATING:
        return goods.sort((a, b) => b.rating.value - a.rating.value);
      default:
        return goods;
    }
  };

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
    this._goods = this._goodsModel.getGoods().slice();
    this._goods = this._sortGoods(this._goods);

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

    this._goodsModel.addObserver(this._onDataChange);
    this._filtersModel.addObserver(this._onDataChange);

    this._renderCatalog();
  }

  update(sortType) {
    this._sortType = sortType || this._sortType;
    this._clearCatalog();
    this._renderCatalog();
  }
}
