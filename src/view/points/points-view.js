import { createElement } from '../../render';

import { createPointsTemplate } from './points.tpl';

export default class PointsView {
  getTemplate() {
    return createPointsTemplate();
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
