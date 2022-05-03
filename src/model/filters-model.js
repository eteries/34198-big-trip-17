import { Filter } from '../constants';

export default class FiltersModel {
  #filters = Object.values(Filter);
  #activeFilter = Filter.Everything;

  get filters() {
    return this.#filters;
  }

  get activeFilter() {
    return this.#activeFilter;
  }
}
