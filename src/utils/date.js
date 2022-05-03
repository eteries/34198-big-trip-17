import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom);

const formatDate = (date, format) => dayjs(date).format(format);

const formatPointDuration = (pointDuration) => {
  const parsedDuration = dayjs.duration(pointDuration);
  const durationElements = [
    ['D', parsedDuration.days()],
    ['H', parsedDuration.hours()],
    ['M', parsedDuration.minutes()],
  ];

  return durationElements
    .reduce((acc, [label, value]) => {
      if (value) {
        acc.push(`${value}${label}`);
      }
      return acc;
    }, [])
    .join(' ');
};

const formatTripDuration = (dateFrom , dateTo) => {
  const Format = {
    Years: `${formatDate(dateFrom, 'DD MMM YYYY')} - ${formatDate(dateTo, 'DD MMM YYYY')}`,
    Month: `${formatDate(dateFrom, 'MMM DD')} - ${formatDate(dateTo, 'MMM DD')}`,
    Days: `${formatDate(dateFrom, 'MMM DD')} - ${formatDate(dateTo, 'DD')}`,
  };

  if (dayjs(dateFrom).year() !== dayjs(dateTo).year()) {
    return Format.Years;
  }

  if (dayjs(dateFrom).month() !== dayjs(dateTo).month()) {
    return Format.Month;
  }

  return Format.Days;
};

const addTimeInterval = (date, interval, unit) => dayjs(date).add(interval, unit).toISOString();

const subtractTimeInterval = (date, interval, unit) => dayjs(date).subtract(interval, unit).toISOString();

const getToday = () => dayjs().startOf('date').toISOString();

export {
  addTimeInterval,
  getDuration,
  getToday,
  formatDate,
  formatPointDuration,
  formatTripDuration,
  subtractTimeInterval
};
