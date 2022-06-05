export const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const IDRange = {
  MIN: 1,
  MAX: 9999,
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
};
