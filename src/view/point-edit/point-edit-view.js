import AbstractView from '../../framework/view/abstract-view';

import { createPointEditTemplate } from './point-edit.tpl';

export default class PointEditView extends AbstractView {
  #destinations = [];
  #offers = [];
  #point;

  constructor (point, destinations, offers) {
    super();

    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#destinations, this.#offers);
  }
}
