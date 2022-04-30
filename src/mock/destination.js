import { getRandomArrayElement, getRandomSubPhrase } from '../utils/random.js';

import { Mock } from './index';
import { MOCK_TEXT } from './text.js';

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
