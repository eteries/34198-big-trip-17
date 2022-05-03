import { formatDate, formatPointDuration, getDuration } from '../../utils/date';
import { POINT_TYPES } from '../../constants';

const createOfferItemTemplate = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`
);

const offersTemplate = (offers) => (
  offers
    .map((offer) => createOfferItemTemplate(offer))
    .join('')
);

export const createPointTemplate = (point) => {
  const {
    dateFrom,
    dateTo,
    type = POINT_TYPES[0],
    destination = {},
    basePrice = 0,
    offers = [],
    isFavorite} = point;
  const {name: destinationName = ''} = destination;

  const dateFromAttr = formatDate(dateFrom, 'YYYY-MM-DD');
  const timeFrom = formatDate(dateFrom, 'HH:mm');
  const timeFromAttr = formatDate(dateFrom, 'YYYY-MM-DD[T]HH:mm');
  const timeTo = formatDate(dateTo, 'HH:mm');
  const timeToAttr = formatDate(dateFrom, 'YYYY-MM-DD[T]HH:mm');
  const duration = formatPointDuration(getDuration(dateFrom, dateTo));
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFromAttr}">
          ${formatDate(dateFrom, 'DD MMM')}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeFromAttr}">
              ${timeFrom}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${timeToAttr}">
              ${timeTo}
            </time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate(offers)}
        </ul>
        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
      </li>`
  );
};
