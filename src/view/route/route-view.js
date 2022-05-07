import AbstractView from '../../framework/view/abstract-view';

import { createRouteTemplate } from './route.tpl';

export default class RouteView extends AbstractView {
  #destinations = [];
  #startDate;
  #endDate;

  constructor(destinations, startDate, endDate) {
    super();

    this.#destinations = destinations;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  get template() {
    return createRouteTemplate(this.#destinations, this.#startDate, this.#endDate);
  }
}
