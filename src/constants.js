export const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const WelcomeMessage = {
  NEW: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

export const Mode = {
  Closed: 'Closed',
  Open: 'Open',
};

export const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const SortType = {
  START_DATE: 'day',
  EVENT: 'event',
  DURATION: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  POINT: 'POINT',
  LIST: 'LIST',
  TRIP: 'TRIP',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

export const BlockerTime = {
  MIN: 350,
  MAX: 1000,
};

export const AUTHORIZATION = 'Basic W34wERcnWOWprx';

export const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

export const Regex = {
  DIGITS: /^(?:[1-9]\d*|\d)$/,
};
