import { remove, render } from '../framework/render';
import RouteView from '../view/route/route-view';
import CostView from '../view/cost/cost-view';
import { UpdateType } from '../constants';
import { calculateCost, calculateTripEnd, calculateTripStart } from '../utils/calculate';
import { getDestinationsNamesByDate } from '../utils/destinations';

export default class HeaderPresenter {
  #headerContainer;

  #costComponent = null;
  #routeComponent = null;

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
    return getDestinationsNamesByDate(this.#tripModel.points);
  }

  get startDate() {
    return calculateTripStart(this.#tripModel.points);
  }

  get endDate() {
    return calculateTripEnd(this.#tripModel.points);
  }

  #renderInfo() {
    if (this.#tripModel.points.length === 0) {
      return;
    }

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
