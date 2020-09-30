import './utility';
import './ajax';
import './modal';
import './goods';
import './payment';
import './delivery';
import './filter';
import './slider';
import './catalog';
import './order';
import {render} from './helpers/common';
import {RenderPosition} from './consts';
import {getFilterTemplate} from './components/filter-component';
import {getOptionsTemplate} from './components/options-component';
import {getSortTemplate} from './components/sort-component';
import {getGoodTemplate} from './components/good-component';
import {getCatalogTemplate} from './components/catalog-component';
import {getLoadMoreTemplate} from './components/load-more-component';
import {getGoods} from './mocks/goods-mock';
import {
  getCategoryFilters,
  getNutritionFilters,
  getOptionFilters
} from './mocks/filter-mock';

const GOODS_COUNT = 14;
const GOODS_COUNT_STEP = 6;

const goods = getGoods(GOODS_COUNT);
const categoryFilters = getCategoryFilters(goods);
const nutritionFilters = getNutritionFilters(goods);
const filterFormElement = document.querySelector('#filter-form');

render(
  filterFormElement,
  getFilterTemplate(nutritionFilters),
  RenderPosition.AFTER_BEGIN
);
render(
  filterFormElement,
  getFilterTemplate(categoryFilters),
  RenderPosition.AFTER_BEGIN
);

const priceRangeElement = document.querySelector('#filter-form-price');
const optionFilters = getOptionFilters(goods);

render(
  priceRangeElement,
  getOptionsTemplate(optionFilters),
  RenderPosition.AFTER_END
);

const showAllElement = document.querySelector('#filter-form-show-all');

render(showAllElement, getSortTemplate(), RenderPosition.BEFORE_BEGIN);

const catalogContainerElement = document
  .querySelector('.catalog__cards-wrap');

render(catalogContainerElement, getCatalogTemplate());

if (goods.length > GOODS_COUNT_STEP) {
  let renderedGoodsCount = GOODS_COUNT_STEP;

  render(catalogContainerElement, getLoadMoreTemplate());

  const loadMoreButton = catalogContainerElement
    .querySelector('.catalog__btn-more');

  const onLoadMoreClick = (evt) => {
    evt.preventDefault();

    goods.slice(renderedGoodsCount, renderedGoodsCount + GOODS_COUNT_STEP)
      .forEach((good) => {
        render(catalogElement, getGoodTemplate(good));
      });

    renderedGoodsCount += GOODS_COUNT_STEP;

    if (renderedGoodsCount >= goods.length) {
      console.log('Rendered all the goods!');
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreClick);
}

const catalogElement = catalogContainerElement
  .querySelector('.catalog__cards');

goods.slice(0, GOODS_COUNT_STEP).forEach((good) => {
  render(catalogElement, getGoodTemplate(good));
});
