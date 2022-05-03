import { offers } from '../mock/offer';

export default class OffersModel {
  #offers = offers;

  get offers() {
    return this.#offers;
  }
}
