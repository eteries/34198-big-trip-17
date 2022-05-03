import { createElement } from '../../render';

import { createNewPointButtonTemplate } from './new-point-button.tpl';

export default class NewPointButtonView {
  #element = null;

  get template() {
    return createNewPointButtonTemplate();
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
