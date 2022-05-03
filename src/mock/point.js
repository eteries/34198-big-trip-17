import { POINT_TYPES } from '../constants';
import { Mock } from '../mock';
import {
  getRandomArrayElement,
  getRandomInt,
  getRandomSubArray,
  getUniqueRandomInt
} from '../utils/random.js';

import { generateEndDate, generateStartDate } from './date';
import { generateDestination } from './destination';
import { offers } from './offer';

export const generatePoint = () => {
  const dateFrom = generateStartDate();
  const dateTo = generateEndDate(dateFrom);
  const type = getRandomArrayElement(POINT_TYPES);
  const destination = generateDestination(getRandomArrayElement(Mock.CITIES));
  const availableOffers = offers.find(
    (offer) => offer.type === type
  );
  const selectedOffers = availableOffers?.offers?.length
    ? getRandomSubArray(availableOffers.offers)
    : [];

  return {
    basePrice: getRandomInt(Mock.Price.MIN, Mock.Price.MAX),
    dateFrom,
    dateTo,
    destination,
    isFavorite: Boolean(getRandomInt(0, 1)),
    id: getUniqueRandomInt(Mock.Id.MIN, Mock.Id.MAX)(),
    offers: selectedOffers,
    type
  };
};
