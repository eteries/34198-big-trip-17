import dayjs from 'dayjs';

const addTimeInterval = (date, interval, unit) => dayjs(date).add(interval, unit).toISOString();

const subtractTimeInterval = (date, interval, unit) => dayjs(date).subtract(interval, unit).toISOString();

export { addTimeInterval, subtractTimeInterval };
