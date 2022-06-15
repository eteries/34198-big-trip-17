import { Filter, WelcomeMessage } from '../constants';
import { filterPoints } from './point';

const mapFilterToMessage = (filter) => {
  switch (filter) {
    case Filter.PAST:
      return WelcomeMessage.PAST;
    case Filter.FUTURE:
      return WelcomeMessage.FUTURE;
    case Filter.EVERYTHING:
    default:
      return WelcomeMessage.NEW;
  }
};

const mapFilterToAmount = (filter, points) => ({
  name: filter,
  number: filterPoints(points, filter).length,
});

export { mapFilterToMessage, mapFilterToAmount };
