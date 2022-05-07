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
}
