import { Filter as Filters, POINT_TYPES, SortType } from '../constants';
import { formatDate, getDifference, getDuration, getToday, getUnixNum } from './date';

const mapPointToState = (point) => {
  const state = {
    ...point,
    id: point.id,
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
  state.isDisabled = false;
  state.isSaving = false;
  state.isDeleting = false;

  return state;
};

const mapStateToPoint = (state) => {
  const point = {...state};

  delete point.dateFromValue;
  delete point.dateToValue;

  return point;
};

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

const mapDtoToPoint = (dto) => {
  const point = {
    ...dto,
    basePrice: dto.base_price,
    dateFrom: dto.date_from,
    dateTo: dto.date_to,
    isFavorite: dto.is_favorite,
  };

  delete point.base_price;
  delete point.date_from;
  delete point.date_to;
  delete point.is_favorite;

  return point;
};

const mapPointToDto = (point) => {
  const dto = {
    ...point,
    'base_price': point.basePrice,
    'date_from': point.dateFrom,
    'date_to': point.dateTo,
    'is_favorite': point.isFavorite,
    'type': point.type.toLowerCase(),
  };

  delete dto.basePrice;
  delete dto.dateFrom;
  delete dto.dateTo;
  delete dto.isFavorite;
  delete dto.isDisabled;
  delete dto.isSaving;
  delete dto.isDeleting;

  return dto;
};

export { mapPointToState, mapStateToPoint, mapPointToDto, mapDtoToPoint, filterPoints, sortPoints };
