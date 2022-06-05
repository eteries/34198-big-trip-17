import { SortType, UpdateType, UserAction } from '../constants';
import { remove, render, RenderPosition } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';
import { filterPoints, sortPoints } from '../utils/point';

import PointPresenter from './point-presenter';

export default class TripPresenter {
  #tripContainer;
  #pointsComponent;
  #sortingComponent;

  #destinationsModel;
  #offersModel;
  #tripModel;
  #filtersModel;

  #destinations;
  #offers;

  #pointPresenters;

  #currentSort;
  #currentFilter;

  constructor(tripContainer, tripModel, destinationsModel, offersModel, filtersModel) {
    this.#tripContainer = tripContainer;

    this.#tripModel = tripModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#currentFilter = this.#filtersModel.currentFilter;

    this.#pointPresenters = new Map();

    this.#currentSort = SortType.START_DATE;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleFilterModelEvent);
  }

  init() {
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#pointsComponent = new PointsView();
    this.#sortingComponent = new SortingView(SortType, this.#currentSort);

    this.#renderTrip();
  }

  get points() {
    this.#currentFilter = this.#filtersModel.currentFilter;
    return sortPoints(filterPoints(this.#tripModel.points, this.#currentFilter), this.#currentSort);
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
    this.#pointPresenters.get(point.id).init(point, this.#destinations, this.#offers);
  }

  #renderSort() {
    render(this.#sortingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortingComponent.setSortingChangeHandler(this.#handleSortTypeChange);
  }

  #reRenderSort() {
    remove(this.#sortingComponent);
    this.#renderSort();
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

    this.#currentSort = sortType;
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
        this.#reRenderSort();
        break;
    }
  };

  #handleFilterModelEvent = (updateType, point) => {
    this.#currentSort = SortType.START_DATE;
    this.#handleModelEvent(updateType, point);
  };
}
