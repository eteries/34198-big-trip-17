import { createElement } from '../../render';

import { createCostTemplate } from './cost.tpl';

export default class CostView {
  getTemplate() {
    return createCostTemplate();
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
