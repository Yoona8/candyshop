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
import FilterComponent from './components/filter-component';
import OptionsComponent from './components/options-component';
import SortComponent from './components/sort-component';
import {render, RenderPosition} from './helpers/common';
import {getGoods} from './mocks/goods-mock';
import {
  getCategoryFilters,
  getNutritionFilters,
  getOptionFilters
} from './mocks/filter-mock';
import GoodsModel from './models/goods-model';
import CatalogController from './controllers/catalog-controller';

const GOODS_COUNT = 15;

const goodsModel = new GoodsModel();

goodsModel.setGoods(getGoods(GOODS_COUNT));

const categoryFilters = getCategoryFilters(goodsModel.getGoods());
const nutritionFilters = getNutritionFilters(goodsModel.getGoods());
const filterFormElement = document.querySelector('#filter-form');

render(
  filterFormElement,
  new FilterComponent(nutritionFilters),
  RenderPosition.AFTER_BEGIN
);
render(
  filterFormElement,
  new FilterComponent(categoryFilters),
  RenderPosition.AFTER_BEGIN
);

const priceRangeElement = document.querySelector('#filter-form-price');
const optionFilters = getOptionFilters(goodsModel.getGoods());
const optionsComponent = new OptionsComponent(optionFilters);

render(
  priceRangeElement,
  optionsComponent,
  RenderPosition.AFTER_END
);

const showAllElement = document.querySelector('#filter-form-show-all');

render(
  showAllElement,
  new SortComponent(),
  RenderPosition.BEFORE_BEGIN
);

const catalogContainerElement = document
  .querySelector('.catalog__cards-wrap');
const catalogController = new CatalogController(
  catalogContainerElement,
  goodsModel
);

catalogController.init();
