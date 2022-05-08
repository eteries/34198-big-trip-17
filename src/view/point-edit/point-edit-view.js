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

  setCloseClickHandler(cb) {
    this._callback.onCloseClick = cb;
    const closeButton = this.element.querySelector('.event__rollup-btn');
    closeButton.addEventListener('click', this._callback.onCloseClick);
  }

  setSubmitHandler(cb) {
    this._callback.onSubmit = cb;
    const editForm = this.element.querySelector('.event--edit');
    editForm.addEventListener('submit', this.#onSubmit);
  }

  #onSubmit = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit();
  };
}
