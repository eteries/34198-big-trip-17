import { createElement } from '../../render';

import { createRouteTemplate } from './route.tpl';

export default class RouteView {
  constructor(destinations, startDate, endDate) {
    this.destinations = destinations;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getTemplate() {
    return createRouteTemplate(this.destinations, this.startDate, this.endDate);
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
