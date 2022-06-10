import { UpdateType } from '../constants';
import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    }
    catch(err) {
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
    }
  }
}
