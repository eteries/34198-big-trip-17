import { POINT_TYPES } from '../../constants.js';

const createPointTypeTemplate = (type, currentType, isDisabled) => {
  const checked = type === currentType ? 'checked' : '';
  const disabled = isDisabled ? 'disabled' : '';
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked} ${disabled}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
};

const createPointTypesTemplate = (types, currentType, isDisabled) => (
  POINT_TYPES
    .map((type) => createPointTypeTemplate(type, currentType, isDisabled))
    .join('')
);

const createOfferTemplate = (currentOffer, selectedOffers, isDisabled) => {
  const {id, title, price} = currentOffer;
  const isAlreadySelected = selectedOffers.find((selected) => id === selected);
  const checked = isAlreadySelected ? 'checked' : '';
  const disabled = isDisabled ? 'disabled' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
             id="event-offer-${id}"
             type="checkbox"
             name="event-offer"
             value="${id}"
             ${checked}
             ${disabled}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOffersTemplate = (availableOffers, selectedOffers, isDisabled) => {
  if (availableOffers.length === 0) {
    return '';
  }

  const offersListTemplate = availableOffers
    .map((offer) => createOfferTemplate(offer, selectedOffers, isDisabled))
    .join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersListTemplate}
      </div>
    </section>`;
};

const createDestinationOptionsTemplate = (destinations) => (
  destinations
    .map(({name}) => `<option value="${name}"></option>`)
    .join('')
);

const createPicturesTemplate = (pictures) => (
  pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')
);

const createDestinationsTemplate = (destination) => {
  if (!destination) {
    return  '';
  }

  const picturesTemplate = createPicturesTemplate(destination.pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
      </div>
    </section>`
  );
};

export const createPointEditTemplate = (point, destinations = [], availableOffers = []) => {
  const {type, dateFromValue, dateToValue, basePrice, offers: selectedOffers, destination, isSaving, isDeleting, isDisabled} = point;

  const typesTemplate = createPointTypesTemplate(POINT_TYPES, type, isDisabled);
  const offersTemplate = createOffersTemplate(availableOffers, selectedOffers, isDisabled);

  const destinationOptionsTemplate = createDestinationOptionsTemplate(destinations);
  const destinationsTemplate = createDestinationsTemplate(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinationOptionsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromValue}" ${isDisabled ? 'disabled' : ''}>
            &mdash; <input class="event__input--time-validator">
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToValue}" ${isDisabled ? 'disabled' : ''}>

          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting ? 'Canceling...' : 'Cancel'}
          </button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Close event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationsTemplate}
        </section>
      </form>
    </li>`
  );
};
