import { SortType, UpdateType, UserAction } from '../constants';
import { remove, render, RenderPosition } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';
import { createEmptyPoint, filterPoints, sortPoints } from '../utils/point';

import PointPresenter from './point-presenter';
import EmptyView from '../view/empty/empty-view';
import NewPointButtonView from '../view/new-point-button/new-point-button-view';
import NewPointPresenter from './new-point-presenter';

export default class TripPresenter {
  #tripContainer;
  #buttonContainer;
  #pointsComponent;
  #sortingComponent;
  #emptyComponent;
  #newPointButtonComponent;

  #destinationsModel;
  #offersModel;
  #tripModel;
  #filtersModel;

  #destinations;
  #offers;

  #pointPresenters;

  #currentSort;
  #currentFilter;

  constructor(tripContainer, buttonContainer, tripModel, destinationsModel, offersModel, filtersModel) {
    this.#tripContainer = tripContainer;
    this.#buttonContainer = buttonContainer;

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

    this.#createViews();
  }

  get points() {
    this.#currentFilter = this.#filtersModel.currentFilter;
    return sortPoints(filterPoints(this.#tripModel.points, this.#currentFilter), this.#currentSort);
  }

  set points(points) {
    this.#tripModel.points = points;
  }

  #createViews() {
    this.#pointsComponent = new PointsView();
    this.#sortingComponent = new SortingView(SortType, this.#currentSort);
    this.#emptyComponent = new EmptyView(this.#currentFilter);

    this.#renderTrip();
    this.#renderNewPointButton();
  }

  #renderTrip() {
    if (this.points.length === 0) {
      this.#renderEmptyTrip();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }

  #reRenderTrip() {
    remove(this.#sortingComponent);
    remove(this.#emptyComponent);
    this.#clearPointsList();

    this.#renderTrip();
  }

  #renderPointsList() {
    render(this.#pointsComponent, this.#tripContainer);
    this.points.forEach(this.#renderPoint, this);
  }

  #reRenderPointsList() {
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderEmptyTrip() {
    render(this.#emptyComponent, this.#tripContainer);
  }

  #renderNewPointButton() {
    this.#newPointButtonComponent = new NewPointButtonView();
    this.#newPointButtonComponent.setNewPointButtonClickHandler(this.#addNewPoint);
    render(this.#newPointButtonComponent, this.#buttonContainer);
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

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #addNewPoint = () => {
    const pointPresenter = new NewPointPresenter(this.#pointsComponent.element, this.#handleViewAction, this.#resetPointsList);
    const newPoint = createEmptyPoint();
    pointPresenter.init(newPoint, this.#destinations, this.#offers);

    pointPresenter.openEditor();
    this.#pointPresenters.set(newPoint.id, pointPresenter);
  };

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
        this.#reRenderTrip();
        break;
    }
  };

  #handleFilterModelEvent = (updateType, point) => {
    this.#currentSort = SortType.START_DATE;
    this.#handleModelEvent(updateType, point);
  };
}
