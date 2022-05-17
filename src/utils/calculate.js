import { getOfferById, getOffersByType } from './filter';

const calculateCost = (points, offers) => points.reduce((cost, current) => {
  const offersSum = current.offers.reduce((sum, id) => {
    const offer = getOfferById(getOffersByType(offers, current.type), id);
    return offer !== undefined
      ? offer.price
      : 0;
  }, 0);
  return cost + current.basePrice + offersSum;
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
