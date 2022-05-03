import { createElement } from '../../render';

import { createPointEditTemplate } from './point-edit.tpl';

export default class PointEditView {
  #destinations = [];
  #element = null;
  #offers = [];
  #point;

  constructor (point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#destinations, this.#offers);
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
