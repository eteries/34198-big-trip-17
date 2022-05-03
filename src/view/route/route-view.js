import { createElement } from '../../render';

import { createRouteTemplate } from './route.tpl';

export default class RouteView {
  #destinations = [];
  #element = null;
  #startDate;
  #endDate;

  constructor(destinations, startDate, endDate) {
    this.#destinations = destinations;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  get template() {
    return createRouteTemplate(this.#destinations, this.#startDate, this.#endDate);
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
