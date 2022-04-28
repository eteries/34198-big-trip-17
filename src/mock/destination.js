import { getRandomArrayElement, getRandomSubPhrase } from '../utils/random.js';
import { MOCK_TEXT } from './text.js';
import { Mock } from '../constants';

export function generateDestination () {
  return {
    name: getRandomArrayElement(Mock.CITIES),
    description: getRandomSubPhrase(MOCK_TEXT),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: getRandomSubPhrase(MOCK_TEXT),
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: getRandomSubPhrase(MOCK_TEXT),
      },
    ],
  };
}
