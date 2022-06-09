import { remove, render } from '../framework/render';
import RouteView from '../view/route/route-view';
import CostView from '../view/cost/cost-view';
import { UpdateType } from '../constants';
import { calculateCost, calculateTripEnd, calculateTripStart } from '../utils/calculate';
import { getUniqueDestinations } from '../utils/destinations';

export default class HeaderPresenter {
  #headerContainer;

  #costComponent;
  #routeComponent;

  #tripModel;
  #offersModel;

  constructor(headerContainer, tripModel, offersModel) {
    this.#headerContainer = headerContainer;

    this.#tripModel = tripModel;
    this.#offersModel = offersModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderInfo();
  }

  get cost() {
    return calculateCost(this.#tripModel.points, this.#offersModel.offers);
  }

  get destinations() {
    return getUniqueDestinations(this.#tripModel.points);
  }

  get startDate() {
    return calculateTripStart(this.#tripModel.points);
  }

  get endDate() {
    return calculateTripEnd(this.#tripModel.points);
  }

  #renderInfo() {
    this.#routeComponent = new RouteView(this.destinations, this.startDate, this.endDate);
    this.#costComponent = new CostView(this.cost);

    render(this.#routeComponent, this.#headerContainer);
    render(this.#costComponent, this.#headerContainer);
  }

  #reRenderInfo() {
    remove(this.#costComponent);
    remove(this.#routeComponent);

    this.#renderInfo();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.TRIP:
        this.#reRenderInfo();
    }
  };
}
