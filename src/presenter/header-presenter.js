import { UpdateType } from '../constants';
import { remove, render } from '../framework/render';
import RouteView from '../view/route/route-view';
import CostView from '../view/cost/cost-view';
import { calculateCost, calculateTripEnd, calculateTripStart } from '../utils/calculate';
import { getDestinationsNamesByDate } from '../utils/destinations';

export default class HeaderPresenter {
  #headerContainer;

  #costComponent = null;
  #routeComponent = null;

  #tripModel;
  #offersModel;
  #destinationsModel;

  #hasError = false;

  constructor(headerContainer, tripModel, offersModel, destinationsModel) {
    this.#headerContainer = headerContainer;

    this.#tripModel = tripModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);

    this.#init();
  }

  #init() {
    if (this.#hasError || !this.#tripModel.points) {
      return;
    }

    this.#routeComponent = new RouteView(this.destinations, this.startDate, this.endDate);
    this.#costComponent = new CostView(this.cost);

    render(this.#routeComponent, this.#headerContainer);
    render(this.#costComponent, this.#headerContainer);
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

  #reRenderInfo() {
    remove(this.#costComponent);
    remove(this.#routeComponent);

    this.#init();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#init();
        break;
      case UpdateType.TRIP:
        this.#reRenderInfo();
        break;
      case UpdateType.ERROR:
        this.#hasError = true;
        this.#reRenderInfo();
    }
  };
}
