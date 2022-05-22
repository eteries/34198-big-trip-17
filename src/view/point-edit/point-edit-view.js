import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

import { createPointEditTemplate } from './point-edit.tpl';
import { mapPointToState } from '../../utils/point';

export default class PointEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #point;

  constructor (point, destinations, offers) {
    super();

    this.#destinations = destinations;
    this.#offers = offers;

    this._state = mapPointToState(point);
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
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

  restoreHandlers() {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.onCloseClick);
    this.setSubmitHandler(this._callback.onSubmit);
  }

  #setInnerHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
  }

  #onTypeChange = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #onSubmit = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit();
  };
}
