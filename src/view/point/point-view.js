import { createElement } from '../../render';

import { createPointTemplate } from './point.tpl';

export default class PointView {
  #element = null;
  #point;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
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
