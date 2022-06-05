const getUniqueDestinations = (points) => [...new Set(points.map(({destination = {}}) => destination.name))];

export { getUniqueDestinations };
