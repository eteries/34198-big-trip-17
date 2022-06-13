import { Filter as Filters, IDRange, POINT_TYPES, SortType } from '../constants';
import { formatDate, getDifference, getDuration, getToday, getUnixNum } from './date';
import { getUniqueRandomInt } from './random';

const mapPointToState = (point) => {
  const state = {
    ...point,
    id: point.id ?? getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
    isFavorite: point.isFavorite ?? false,
    type: point.type ?? POINT_TYPES[0],
    dateFrom: point.dateFrom ?? getToday(),
    dateTo: point.dateTo ?? getToday(),
    basePrice: point.basePrice ?? 0,
    offers: point.offers ?? [],
    destination: point.destination ?? null,
  };

  state.dateFromValue = formatDate(state.dateFrom, 'DD/MM/YY HH:mm');
  state.dateToValue = formatDate(state.dateTo, 'DD/MM/YY HH:mm');

  return state;
};

const mapStateToPoint = (state) => {
  const point = {...state};

  delete point.dateFromValue;
  delete point.dateToValue;

  return point;
};

const createEmptyPoint = () => ({
  id: getUniqueRandomInt(IDRange.MIN, IDRange.MAX)(),
  isFavorite: false,
  type: POINT_TYPES[0],
  dateFrom: getToday(),
  dateTo: getToday(),
  basePrice: 0,
  offers: [],
  destination: null,
});

const sortPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.START_DATE:
      return [...points].sort((pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom));

    case SortType.DURATION:
      return [...points].sort((pointA, pointB) => getDuration(pointA.dateFrom, pointA.dateTo) - getDuration(pointB.dateFrom, pointB.dateTo));

    case SortType.PRICE:
      return [...points].sort((pointA, pointB) => pointA.basePrice - pointB.basePrice);

    default:
      return points;
  }
};

const filterPoints = (points, filterType) => {
  switch (filterType) {
    case Filters.FUTURE:
      return [...points].filter((point) => getUnixNum(point.dateFrom) > getUnixNum(new Date()));

    case Filters.PAST:
      return [...points].filter((point) => getUnixNum(point.dateTo) < getUnixNum(new Date()));

    default:
      return points;
  }
};

export { createEmptyPoint, mapPointToState, mapStateToPoint, filterPoints, sortPoints };
