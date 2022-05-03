import { getRandomInt } from '../utils/random.js';
import { addTimeInterval, subtractTimeInterval } from '../utils/date';
import { Mock } from './index';

const generateStartDate = () => (
  getRandomInt(0, 1)
    ? addTimeInterval(Date(), getRandomInt(Mock.MinutesToStart.MIN, Mock.MinutesToStart.MAX), 'minute')
    : subtractTimeInterval(Date(), getRandomInt(Mock.MinutesToStart.MIN, Mock.MinutesToStart.MAX), 'minute')
);

const generateEndDate = (dateFrom) => (
  addTimeInterval(dateFrom, getRandomInt(Mock.MinutesToEnd.MIN, Mock.MinutesToEnd.MAX), 'minute')
);

export { generateStartDate, generateEndDate };
