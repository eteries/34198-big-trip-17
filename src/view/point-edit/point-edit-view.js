import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getOffersByType } from '../../utils/filter';
import { mapPointToState, mapStateToPoint } from '../../utils/point';
import { addItem, removeItem } from '../../utils/update';

import { createPointEditTemplate } from './point-edit.tpl';

export default class PointEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];

  constructor(point, destinations, offers) {
    super();

    this._state = mapPointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;

    this.#setInnerHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#getAvailableOffers());
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

  #getAvailableOffers() {
    return getOffersByType(this.#offers, this._state.type);
  }

  #setInnerHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#onDestinationChange);
    this.element.querySelector('.event__details').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceChange);
  }

  #onTypeChange = ({target}) => {
    this.updateElement({
      type: target.value,
    });
  };

  #onDestinationChange = ({target}) => {
    const destination = this.#destinations.find(({name}) => name === target.value);

    if (destination === undefined) {
      return;
    }

    this.updateElement({
      destination,
    });
  };

  #onPriceChange = ({target}) => {
    const basePrice = parseInt(target.value, 10);

    if (!isFinite(basePrice) || basePrice < 0) {
      return;
    }

    this.updateElement({
      basePrice,
    });
  };

  #onOffersChange = ({target: checkbox}) => {
    const id = Number(checkbox.value);
    const offers = checkbox.checked
      ? addItem(id, this._state.offers)
      : removeItem(id, this._state.offers);

    this.updateElement({
      offers
    });
  };

  #onSubmit = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit(mapStateToPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.onCloseClick);
    this.setSubmitHandler(this._callback.onSubmit);
  };
}
