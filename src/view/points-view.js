import { createElement } from '../render.js';

const createPointsTemplate = () => '<ul class="trip-events__list"></ul>';

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
