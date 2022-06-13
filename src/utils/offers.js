const getOfferById = (offers, id) => offers.find((offer) => offer.id === id);

const getOffersByType = (offers, type) => {
  const filtered = offers.find((offer) => offer.type === type.toLowerCase());
  return filtered !== undefined ? filtered.offers : [];
};

export { getOfferById, getOffersByType };
