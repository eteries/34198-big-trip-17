export const filterOffers = (offers, type) => {
  const filtered = offers.find((offer) => offer.type === type);
  return filtered !== undefined ? filtered.offers : [];
};
