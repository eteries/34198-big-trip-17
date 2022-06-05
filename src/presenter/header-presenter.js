import { remove, render } from '../framework/render';
import RouteView from '../view/route/route-view';
import CostView from '../view/cost/cost-view';
import NewPointButtonView from '../view/new-point-button/new-point-button-view';
import { UpdateType } from '../constants';
import { calculateCost, calculateTripEnd, calculateTripStart } from '../utils/calculate';
import { getUniqueDestinations } from '../utils/destinations';

export default class HeaderPresenter {
  #headerContainer;
  #infoContainer;

  #costComponent;
  #routeComponent;

  #tripModel;
  #offersModel;

  constructor(headerContainer, infoContainer, tripModel, offersModel) {
    this.#headerContainer = headerContainer;
    this.#infoContainer = infoContainer;

    this.#tripModel = tripModel;
    this.#offersModel = offersModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderInfo();
    this.#renderNewPointButton();
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

  #renderNewPointButton() {
    render(new NewPointButtonView(), this.#headerContainer);
  }

  #renderInfo() {
    this.#routeComponent = new RouteView(this.destinations, this.startDate, this.endDate);
    this.#costComponent = new CostView(this.cost);

    render(this.#routeComponent, this.#infoContainer);
    render(this.#costComponent, this.#infoContainer);
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
