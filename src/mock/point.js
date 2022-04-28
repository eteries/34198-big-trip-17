import { Mock, POINT_TYPES } from '../constants';
import { generateDestination } from './destination.js';
import { offers } from './offer.js';
import {
  getRandomArrayElement,
  getRandomInt,
  getRandomSubArray,
  getUniqueRandomInt
} from '../utils/random.js';
import { getOffersByType } from '../utils/filter';

export function generatePoint() {
  const type = getRandomArrayElement(POINT_TYPES);
  const availableOffers = getOffersByType(offers, type);
  const selectedOffers = availableOffers.length ? getRandomSubArray(availableOffers) : [];

  return {
    basePrice: getRandomInt(Mock.Price.MIN, Mock.Price.MAX),
    dateFrom: null,
    dateTo: null,
    destination: generateDestination(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    id: getUniqueRandomInt(Mock.Id.MIN, Mock.Id.MAX)(),
    offers: selectedOffers,
    type
  };
}
