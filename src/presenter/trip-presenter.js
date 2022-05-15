import { render } from '../framework/render';
import PointsView from '../view/points/points-view';
import SortingView from '../view/sorting/sorting-view';

import PointPresenter from './point-presenter';

export default class TripPresenter {
  #tripContainer;
  #pointsComponent = new PointsView();

  #destinationsModel;
  #offersModel;
  #tripModel;

  #points;
  #destinations;
  #offers;

  init(tripContainer, tripModel, destinationsModel, offersModel) {
    this.#tripContainer = tripContainer;

    this.#tripModel = tripModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...this.#tripModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    render(new SortingView(), this.#tripContainer);
    render(this.#pointsComponent, this.#tripContainer);

    this.#points.forEach(this.#renderPoint, this);
  }

  #renderPoint(point) {
    new PointPresenter(this.#pointsComponent.element).init(point, this.#destinations, this.#offers);
  }
}
