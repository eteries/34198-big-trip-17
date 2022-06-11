import Observable from '../framework/observable';
import { UpdateType } from '../constants';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;

    this.#init();
  }

  get offers() {
    return this.#offers;
  }

  async #init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    }
    catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.TRIP);
  }
}
