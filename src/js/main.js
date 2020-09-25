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

const filterFormElement = document.querySelector('#filter-form');

render(filterFormElement, getFilterTemplate());
