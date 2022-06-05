import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getUnixNum, setDateTimePicker } from '../../utils/date';
import { highlightElement } from '../../utils/dom';
import { getOffersByType } from '../../utils/filter';
import { mapPointToState, mapStateToPoint } from '../../utils/point';
import { addItem, removeItem } from '../../utils/update';

import { createPointEditTemplate } from './point-edit.tpl';

export default class PointEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #datepickers = {};

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

  setDeleteHandler(cb) {
    this._callback.onDelete = cb;
    const editForm = this.element.querySelector('.event--edit');
    editForm.addEventListener('reset', this.#onDelete);
  }

  setDatepickers() {
    this.#datepickers.dateFrom = setDateTimePicker({
      element: this.element.querySelector('#event-start-time-1'),
      defaultDate: this._state.dateFrom,
      onChange: this.#onDateFromChange,
    });

    this.#datepickers.dateTo = setDateTimePicker({
      element: this.element.querySelector('#event-end-time-1'),
      defaultDate: this._state.dateTo,
      onChange: this.#onDateToChange,
    });
  }

  removeDatepickers() {
    this.#datepickers?.dateFrom?.destroy();
    this.#datepickers?.dateTo?.destroy();
    this.#datepickers = {};
  }

  #getAvailableOffers() {
    return getOffersByType(this.#offers, this._state.type);
  }

  #validateDate() {
    const dateTo = this.element.querySelector('.event__field-group--time');
    const isValid = getUnixNum(this._state.dateFrom) <= getUnixNum(this._state.dateTo);

    return {
      isValid,
      element: dateTo
    };
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

    const {element, isValid} = this.#validateDate();
    highlightElement(element, isValid);
    if (isValid === false) {
      return;
    }

    this._callback.onSubmit(mapStateToPoint(this._state));
  };

  #onDelete = (evt) => {
    evt.preventDefault();
    this._callback.onDelete(mapStateToPoint(this._state));
  };

  #onDateFromChange = ([dateFrom]) => {
    this.updateElement({
      dateFrom,
    });
  };

  #onDateToChange = ([dateTo]) => {
    this.updateElement({
      dateTo,
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.onCloseClick);
    this.setSubmitHandler(this._callback.onSubmit);
    this.setDeleteHandler(this._callback.onDelete);
    this.setDatepickers();
  };

  removeElement = () => {
    super.removeElement();

    this.removeDatepickers();
  };
}
