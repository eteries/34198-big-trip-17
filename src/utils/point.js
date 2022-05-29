import { IDRange, POINT_TYPES } from '../constants';
import { formatDate, getDifference, getDuration, getToday } from './date';
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
  state.dateToValue= formatDate(state.dateTo, 'DD/MM/YY HH:mm');

  return state;
};

const mapStateToPoint = (state) => {
  const point = {...state};

  delete point.dateFromValue;
  delete point.dateToValue;

  return point;
};

const sortByStartDate = (pointA, pointB) => getDifference(pointA.dateFrom, pointB.dateFrom);

const sortByDuration = (pointA, pointB) => getDuration(pointA.dateFrom, pointA.dateTo) - getDuration(pointB.dateFrom, pointB.dateTo);

const sortByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export { mapPointToState, mapStateToPoint, sortByStartDate, sortByDuration, sortByPrice };
