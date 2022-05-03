import { createElement } from '../../render';

import { createCostTemplate } from './cost.tpl';

export default class CostView {
  #cost = 0;
  #element = null;

  constructor(cost) {
    this.#cost = cost;
  }

  get template() {
    return createCostTemplate(this.#cost);
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
