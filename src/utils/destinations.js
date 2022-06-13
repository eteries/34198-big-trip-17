import { sortPoints } from './point';
import { SortType } from '../constants';

const getDestinationsNamesByDate = (points) => (
  sortPoints(points, SortType.START_DATE)
    .map(({destination}) => destination.name)
);

export { getDestinationsNamesByDate };
