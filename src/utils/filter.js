const getOffersByType = (offers, type) => {
  const filtered = offers.filter((offer) => offer.type === type);
  return filtered.length ? filtered[0].offers : [];
};

export { getOffersByType };
