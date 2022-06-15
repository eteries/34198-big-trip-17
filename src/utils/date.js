import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import flatpickr from 'flatpickr';

dayjs.extend(duration);

const getDuration = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom);

const getUnixNum = (date) => dayjs(date).unix();

const formatDate = (date, format) => dayjs(date).format(format);

const formatPointDuration = (pointDuration) => {
  const days = Math.floor(dayjs.duration(pointDuration).asDays());
  const hours = Math.floor(dayjs.duration(pointDuration -= days * 24 * 60 * 60 * 1000).asHours());
  const minutes = Math.floor(dayjs.duration(pointDuration - hours * 60 * 60 * 1000).asMinutes());

  const durationElements = [
    ['D', days],
    ['H', hours],
    ['M', minutes],
  ];

  return durationElements
    .reduce((acc, [label, value]) => {
      if (value) {
        acc.push(`${value.toString().padStart(2, '0')}${label}`);
      }
      return acc;
    }, [])
    .join(' ');
};

const formatTripDuration = (dateFrom , dateTo) => {
  const Format = {
    Years: `${formatDate(dateFrom, 'DD MMM YYYY')} - ${formatDate(dateTo, 'DD MMM YYYY')}`,
    Month: `${formatDate(dateFrom, 'DD MMM')} - ${formatDate(dateTo, 'DD MMM')}`,
    Days: `${formatDate(dateFrom, 'DD')} - ${formatDate(dateTo, 'DD MMM')}`,
  };

  if (dayjs(dateFrom).year() !== dayjs(dateTo).year()) {
    return Format.Years;
  }

  if (dayjs(dateFrom).month() !== dayjs(dateTo).month()) {
    return Format.Month;
  }

  return Format.Days;
};

const getDifference = (firstDate, secondDate) => dayjs(firstDate).diff(secondDate);

const getToday = () => dayjs().startOf('date').toISOString();

const setDateTimePicker = ({element, defaultDate, onChange}) => (
  flatpickr(
    element,
    {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate,
      onChange
    }
  )
);

export {
  getDuration,
  getDifference,
  getToday,
  getUnixNum,
  formatDate,
  formatPointDuration,
  formatTripDuration,
  setDateTimePicker
};
