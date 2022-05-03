import { Mock } from '../mock';
import { generateDestination } from '../mock/destination';

export default class DestinationsModel {
  #destinations = Mock.CITIES.map(generateDestination);

  get destinations() {
    return this.#destinations;
  }
}
