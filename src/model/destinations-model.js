export default class DestinationsModel {
  #destinations;

  constructor(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
