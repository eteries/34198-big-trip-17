import { createElement } from '../../render';

import { createPointsTemplate } from './points.tpl';

export default class PointsView {
  #element = null;

  get template() {
    return createPointsTemplate();
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
