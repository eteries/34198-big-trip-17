import { render } from '../framework/render';
import PointsView from '../view/points/points-view';
import PointEditView from '../view/point-edit/point-edit-view';
import PointView from '../view/point/point-view';
import SortingView from '../view/sorting/sorting-view';
import { isEscapeKey } from '../utils/dom';

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
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point, this.#destinations, this.#offers);

    const openEditor = () => {
      pointComponent.element.replaceWith(pointEditComponent.element);
    };

    const closeEditor = () => {
      pointEditComponent.element.replaceWith(pointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        closeEditor();
      }
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointComponent.setOpenClickHandler(() => {
      openEditor();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setCloseClickHandler(() => {
      closeEditor();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setSubmitHandler(() => {
      closeEditor();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsComponent.element);
  }
}
