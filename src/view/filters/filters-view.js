import { createElement } from '../../render';

import { createFiltersTemplate } from './filters.tpl';

export default class FiltersView {
  #activeFilter = '';
  #filters = [];
  #element = null;

  constructor(filters, activeFilter) {
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
