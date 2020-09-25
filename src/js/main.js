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

const GOODS_COUNT = 6;

const filterFormElement = document.querySelector('#filter-form');

render(filterFormElement, getFilterTemplate(), RenderPosition.AFTER_BEGIN);
render(filterFormElement, getFilterTemplate(), RenderPosition.AFTER_BEGIN);

const priceRangeElement = document.querySelector('#filter-form-price');

render(priceRangeElement, getOptionsTemplate(), RenderPosition.AFTER_END);

const showAllElement = document.querySelector('#filter-form-show-all');

render(showAllElement, getSortTemplate(), RenderPosition.BEFORE_BEGIN);

const catalogContainerElement = document
  .querySelector('.catalog__cards-wrap');

render(catalogContainerElement, getCatalogTemplate());
render(catalogContainerElement, getLoadMoreTemplate());

const catalogElement = catalogContainerElement
  .querySelector('.catalog__cards');

for (let i = 0; i < GOODS_COUNT; i++) {
  render(catalogElement, getGoodTemplate());
}
