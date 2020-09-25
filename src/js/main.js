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
import {getFilterTemplate} from './components/filter-component';
import {getOptionsTemplate} from './components/options-component';
import {getSortTemplate} from './components/sort-component';
import {RenderPosition} from './consts';

const filterFormElement = document.querySelector('#filter-form');

render(filterFormElement, getFilterTemplate(), RenderPosition.AFTER_BEGIN);
render(filterFormElement, getFilterTemplate(), RenderPosition.AFTER_BEGIN);

const priceRangeElement = document.querySelector('#filter-form-price');

render(priceRangeElement, getOptionsTemplate(), RenderPosition.AFTER_END);

const showAllElement = document.querySelector('#filter-form-show-all');

render(showAllElement, getSortTemplate(), RenderPosition.BEFORE_BEGIN);
