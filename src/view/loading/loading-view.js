import { createElement } from '../../render';

import { createLoadingTemplate } from './loading.tpl';

export default class LoadingView {
  #element = null;

  get template() {
    return createLoadingTemplate();
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
