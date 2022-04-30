import { createElement } from '../../render';

import { createNewPointButtonTemplate } from './new-point-button.tpl';

export default class NewPointButtonView {
  getTemplate() {
    return createNewPointButtonTemplate();
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
