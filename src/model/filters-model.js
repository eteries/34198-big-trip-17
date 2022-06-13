import { Filter } from '../constants';
import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #filters = Object.values(Filter);
  #currentFilter = Filter.EVERYTHING;

  get filters() {
    return this.#filters;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
