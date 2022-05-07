import AbstractView from '../../framework/view/abstract-view';

import { createCostTemplate } from './cost.tpl';

export default class CostView extends AbstractView {
  #cost = 0;

  constructor(cost) {
    super();

    this.#cost = cost;
  }

  get template() {
    return createCostTemplate(this.#cost);
  }
}
