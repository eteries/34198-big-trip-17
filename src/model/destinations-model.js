import { Mock } from '../mock';
import { generateDestination } from '../mock/destination';

export default class DestinationsModel {
  destinations = Mock.CITIES.map(generateDestination);

  getDestinations = () => this.destinations;
}
