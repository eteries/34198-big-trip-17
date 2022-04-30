import { offers } from '../mock/offer';

export default class OffersModel {
  offers = offers;

  getOffers = () => this.offers;
}
