import Observable from '../helpers/observable';

export default class FiltersModel extends Observable {
  constructor() {
    super();

    this._activeFilters = new Set();
  }

  addFilter(updateType, update) {
    this._activeFilters.add(update);
    this._notify(updateType, this._activeFilters);
  }

  removeFilter(updateType, update) {
    this._activeFilters.delete(update);
    this._notify(updateType, this._activeFilters);
  }

  getFilters() {
    return this._activeFilters;
  }
}
