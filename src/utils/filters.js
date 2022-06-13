import { Filter, WelcomeMessage } from '../constants';

const mapFilterToMessage = (filter) => {
  switch(filter) {
    case Filter.PAST:
      return WelcomeMessage.PAST;
    case Filter.FUTURE:
      return WelcomeMessage.FUTURE;
    case Filter.EVERYTHING:
    default:
      return WelcomeMessage.NEW;
  }
};

export { mapFilterToMessage };
