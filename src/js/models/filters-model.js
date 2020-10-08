import Observable from '../helpers/observable';

export default class FiltersModel extends Observable {
  constructor() {
    super();

    this._activeFilters = [];
  }

  addFilter(updateType, update) {
    this._activeFilters.push(update);
    this._notify(updateType, this._activeFilters);
  }

  getFilters() {
    return this._activeFilters;
  }
}
