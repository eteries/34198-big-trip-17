export const filterOffers = (offers, type) => {
  const filtered = offers.filter((offer) => offer.type === type);
  return filtered.length > 0 ? filtered[0].offers : [];
};
