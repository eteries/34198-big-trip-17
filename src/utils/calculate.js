import { getOfferById, getOffersByType } from './offers';

const calculateOfferCost = (allOffers, type, id) => {
  const offer = getOfferById(getOffersByType(allOffers, type), id);
  return offer !== undefined
    ? offer.price
    : 0;
};

const calculateCost = (points, offers) => points.reduce((acc, point) => {
  const offersSum = point.offers.reduce((sum, id) => sum + calculateOfferCost(offers, point.type, id), 0);
  return acc + point.basePrice + offersSum;
}, 0);

const calculateTripStart = (points) => points
  .map(({dateFrom}) => dateFrom)
  .sort()[0];

const calculateTripEnd = (points) => (
  points
    .map(({dateTo}) => dateTo)
    .sort()
    .reverse()[0]
);

export { calculateCost, calculateTripStart, calculateTripEnd };
