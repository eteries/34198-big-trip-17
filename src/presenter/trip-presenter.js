import { SortType, UpdateType, UserAction } from '../constants';
import { remove, render, RenderPosition } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';
import { filterPoints, mapPointToState, sortPoints } from '../utils/point';

import PointPresenter from './point-presenter';
import EmptyView from '../view/empty/empty-view';
import NewPointButtonView from '../view/new-point-button/new-point-button-view';
import NewPointPresenter from './new-point-presenter';

export default class TripPresenter {
  #tripContainer;
  #buttonContainer;
  #pointsComponent = null;
  #sortingComponent = null;
  #emptyComponent = null;
  #newPointButtonComponent = null;

  #destinationsModel;
  #offersModel;
  #tripModel;
  #filtersModel;

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
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
  }

  #init() {
    this.#pointsComponent = new PointsView();
    this.#sortingComponent = new SortingView(SortType, this.#currentSort);

    this.#renderTrip();
    this.#renderNewPointButton();
  }

  get points() {
    if (this.#tripModel.points === null) {
      return this.#tripModel.points;
    }
    this.#currentFilter = this.#filtersModel.currentFilter;
    return sortPoints(filterPoints(this.#tripModel.points, this.#currentFilter), this.#currentSort);
  }

  set points(points) {
    this.#tripModel.points = points;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
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
    if (this.points === null) {
      return;
    }

    remove(this.#sortingComponent);
    remove(this.#emptyComponent);
    this.#clearPointsList();

    this.#renderTrip();
  }

  #renderPointsList() {
    if (this.points === null) {
      return;
    }

    render(this.#pointsComponent, this.#tripContainer);
    this.points.forEach(this.#renderPoint, this);
  }

  #reRenderPointsList() {
    this.#clearPointsList();
    this.#renderPointsList();
  }

  #renderEmptyTrip() {
    this.#emptyComponent = new EmptyView(this.#currentFilter);
    render(this.#emptyComponent, this.#tripContainer);
  }

  #renderNewPointButton() {
    this.#newPointButtonComponent = new NewPointButtonView();
    this.#newPointButtonComponent.setNewPointButtonClickHandler(this.#addNewPoint);
    render(this.#newPointButtonComponent, this.#buttonContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsComponent.element, this.#handleViewAction, this.#resetPointsList);
    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #reRenderPoint(point) {
    this.#pointPresenters.get(point.id).init(point, this.destinations, this.offers);
  }

  #renderSort() {
    render(this.#sortingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortingComponent.setSortingChangeHandler(this.#handleSortTypeChange);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #resetSortType() {
    this.#currentSort = SortType.START_DATE;
  }

  #addNewPoint = () => {
    const pointPresenter = new NewPointPresenter(this.#pointsComponent.element, this.#handleViewAction, this.#resetPointsList);
    const newPoint = {};
    pointPresenter.init(mapPointToState(newPoint), this.destinations, this.offers);

    pointPresenter.openEditor();
    this.#pointPresenters.set(null, pointPresenter);
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

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#tripModel.updatePoint(updateType, update);
        }
        catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointPresenters.get(null).setSaving();
        try {
          await this.#tripModel.addPoint(updateType, update);
        }
        catch(err) {
          this.#pointPresenters.get(null).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#tripModel.deletePoint(updateType, update);
        }
        catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#init();
        break;
      case UpdateType.POINT:
        this.#reRenderPoint(point);
        break;
      case UpdateType.LIST:
        this.#resetSortType();
        this.#reRenderPointsList();
        break;
      case UpdateType.TRIP:
        this.#reRenderTrip();
    }
  };
}
