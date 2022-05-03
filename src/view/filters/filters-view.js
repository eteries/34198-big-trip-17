import { createElement } from '../../render';

import { createFiltersTemplate } from './filters.tpl';

export default class FiltersView {
  constructor(filters, activeFilter) {
    this.filters = filters;
    this.activeFilter = activeFilter;
  }

  getTemplate() {
    return createFiltersTemplate(this.filters, this.activeFilter);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
