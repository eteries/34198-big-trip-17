import { SortType, UpdateType, UserAction } from '../constants';
import { render, RenderPosition } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';
import { sortByDuration, sortByPrice, sortByStartDate } from '../utils/point';

import PointPresenter from './point-presenter';

export default class TripPresenter {
  #tripContainer;
  #pointsComponent;
  #sortingComponent;

  #destinationsModel;
  #offersModel;
  #tripModel;

  #destinations;
  #offers;

  #pointPresenters;

  #sortTypes;
  #currentSort;

  constructor(tripContainer, tripModel, destinationsModel, offersModel) {
    this.#tripContainer = tripContainer;

    this.#tripModel = tripModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointPresenters = new Map();

    this.#sortTypes = SortType;
    this.#currentSort = this.#sortTypes.START_DATE;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#pointsComponent = new PointsView();
    this.#sortingComponent = new SortingView(this.#sortTypes, this.#currentSort);

    this.#renderTrip();
  }

  get points() {
    return this.#tripModel.points;
  }

  set points(points) {
    this.#tripModel.points = points;
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#pointsComponent, this.#tripContainer);
    this.points.forEach(this.#renderPoint, this);
  }

  #reRenderPointsList() {
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsComponent.element, this.#handleViewAction, this.#resetPointsList);
    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #reRenderPoint(point) {
    this.#pointPresenters.get(point.id).init(point);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.START_DATE:
        this.points.sort(sortByStartDate);
        break;
      case SortType.DURATION:
        this.points.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.points.sort(sortByPrice);
    }

    this.#currentSort = sortType;
  }

  #renderSort() {
    render(this.#sortingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortingComponent.setSortingChangeHandler(this.#handleSortTypeChange);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #resetPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#reRenderPointsList();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.POINT:
        this.#reRenderPoint(point);
        break;
      case UpdateType.LIST:
        this.#reRenderPointsList();
        break;
      case UpdateType.TRIP:
        this.#reRenderPointsList();
        break;
    }
  };
}
