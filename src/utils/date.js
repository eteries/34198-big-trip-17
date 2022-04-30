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

const addTimeInterval = (date, interval, unit) => dayjs(date).add(interval, unit).toISOString();

const subtractTimeInterval = (date, interval, unit) => dayjs(date).subtract(interval, unit).toISOString();

const getToday = () => dayjs().startOf('date').toISOString();

export { addTimeInterval, getDuration, getToday, formatDate, formatPointDuration, subtractTimeInterval };
