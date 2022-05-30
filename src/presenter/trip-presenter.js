import { render, RenderPosition } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';
import { sortByDuration, sortByPrice, sortByStartDate } from '../utils/point';
import { updateItem } from '../utils/update';
import { SortType } from '../constants';

import PointPresenter from './point-presenter';

export default class TripPresenter {
  #tripContainer;
  #pointsComponent;
  #sortingComponent;

  #destinationsModel;
  #offersModel;
  #tripModel;

  #points;
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
  }

  init() {
    this.#points = [...this.#tripModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#pointsComponent = new PointsView();
    this.#sortingComponent = new SortingView(this.#sortTypes, this.#currentSort);

    this.#renderTrip();
  }

  #renderTrip() {
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#pointsComponent, this.#tripContainer);
    this.#points.forEach(this.#renderPoint, this);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsComponent.element, this.#updatePoints, this.#resetPointsList);
    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.START_DATE:
        this.#points.sort(sortByStartDate);
        break;
      case SortType.DURATION:
        this.#points.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
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

  #updatePoints = (updatedPoint) => {
    updateItem(updatedPoint, this.#points);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
