import { createElement } from '../../render';

import { createRouteTemplate } from './route.tpl';

export default class RouteView {
  getTemplate() {
    return createRouteTemplate();
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
