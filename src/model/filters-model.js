import { Filter } from '../constants';

export default class FiltersModel {
  filters = Object.values(Filter);
  activeFilter = Filter.Everything;

  getFilters = () => this.filters;

  getActiveFilter = () => this.activeFilter;
}
