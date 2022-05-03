import { createElement } from '../../render';

import { createSortingTemplate } from './sorting.tpl';

export default class SortingView {
  #element = null;

  get template() {
    return createSortingTemplate();
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
