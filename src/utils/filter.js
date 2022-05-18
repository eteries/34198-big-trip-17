const getOfferById = (offers, id) => offers.find((offer) => offer.id === id);

const getOffersByType = (offers, type) => {
  const filtered = offers.find((offer) => offer.type === type);
  return filtered !== undefined ? filtered.offers : [];
};

const getUniqueDestinations = (points) => [...new Set(points.map(({destination = {}}) => destination.name))];

export { getOfferById, getOffersByType, getUniqueDestinations };
