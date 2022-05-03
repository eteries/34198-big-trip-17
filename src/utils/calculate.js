const calculateCost = (points) => points.reduce((cost, current) => {
  const offersSum = current.offers.reduce((sum, {price}) => sum + price, 0);
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
