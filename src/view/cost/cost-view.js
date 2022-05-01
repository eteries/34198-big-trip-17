import { createElement } from '../../render';

import { createCostTemplate } from './cost.tpl';

export default class CostView {
  constructor(cost) {
    this.cost = cost;
  }

  getTemplate() {
    return createCostTemplate(this.cost);
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
