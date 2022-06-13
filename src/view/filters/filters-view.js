import AbstractView from '../../framework/view/abstract-view';

import { createFiltersTemplate } from './filters.tpl';

export default class FiltersView extends AbstractView {
  #activeFilter = '';
  #filters = [];

  constructor(filters, activeFilter) {
    super();

    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#handleFilterChange);
  }

  #handleFilterChange = ({target}) => {
    this._callback.filterTypeChange(target.value);
  };
}
