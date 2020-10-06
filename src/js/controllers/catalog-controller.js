import {render} from '../helpers/common';
import CatalogComponent from '../components/catalog-component';
import GoodController from './good-controller';
import LoadMoreComponent from '../components/load-more-component';
import NoGoodsComponent from '../components/no-goods-component';

const GOODS_COUNT_STEP = 6;

export default class CatalogController {
  constructor(catalogContainerElement, goodsModel) {
    this._catalogContainerElement = catalogContainerElement;
    this._goodsModel = goodsModel;
    this.goods = [];

    this._catalogComponent = new CatalogComponent();
  }

  init() {
    this._goods = this._goodsModel.getGoods();

    render(this._catalogContainerElement, this._catalogComponent);

    const catalogElement = this._catalogContainerElement
      .querySelector('.catalog__cards');

    const onDataChange = (updatedGood) => {
      this._goodsModel.updateGood(updatedGood);
    };

    const renderGood = (good) => {
      const goodController = new GoodController(
        catalogElement,
        good,
        onDataChange
      );

      goodController.init();
    };

    if (this._goods.length > GOODS_COUNT_STEP) {
      let renderedGoodsCount = GOODS_COUNT_STEP;

      const loadMoreComponent = new LoadMoreComponent();

      render(this._catalogContainerElement, loadMoreComponent);

      const onLoadMoreClick = () => {
        this._goods
          .slice(renderedGoodsCount, renderedGoodsCount + GOODS_COUNT_STEP)
          .forEach((good) => {
            renderGood(good);
          });

        renderedGoodsCount += GOODS_COUNT_STEP;

        if (renderedGoodsCount >= this._goods.length) {
          loadMoreComponent.getElement().remove();
          loadMoreComponent.removeElement();
        }
      };

      loadMoreComponent.setOnClick(onLoadMoreClick);
    }

    if (this._goods.length === 0) {
      render(this._catalogContainerElement, new NoGoodsComponent());
    } else {
      this._goods.slice(0, GOODS_COUNT_STEP).forEach((good) => {
        renderGood(good);
      });
    }
  }
}
