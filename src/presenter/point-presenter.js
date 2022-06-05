import { Mode, UpdateType, UserAction } from '../constants';
import { remove, render } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import PointView from '../view/point/point-view';
import PointEditView from '../view/point-edit/point-edit-view';

export default class PointPresenter {
  #container;
  #pointComponent = null;
  #pointEditComponent = null;

  #point;
  #destinations;
  #offers;

  #onUpdate;
  #onOpen;

  #mode = Mode.Closed;

  constructor(container, onUpdate, onOpen) {
    this.#container = container;

    this.#onUpdate = onUpdate;
    this.#onOpen = onOpen;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#offers);
    this.#pointEditComponent = new PointEditView(this.#point, this.#destinations, this.#offers);

    this.#setHandlers();

    if (prevPointComponent === null || prevPointEditComponent === null) {
      this.#renderPoint();
      return;
    }

    if (this.#mode === Mode.Closed) {
      prevPointComponent.element.replaceWith(this.#pointComponent.element);
    }

    if (this.#mode === Mode.Open) {
      prevPointEditComponent.element.replaceWith(this.#pointEditComponent.element);
    }

    prevPointComponent.removeElement();
    prevPointEditComponent.removeElement();
  }

  reset() {
    if (this.#mode !== Mode.Closed) {
      this.#closeEditor();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #openEditor() {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
    this.#onOpen();
    this.#pointEditComponent.setDatepickers();
    this.#mode = Mode.Open;
  }

  #closeEditor() {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.Closed;
    this.#pointEditComponent.removeDatepickers();
  }

  #renderPoint() {
    render(this.#pointComponent, this.#container);
  }

  #toggleFavorites() {
    this.#onUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.POINT,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
      });
  }

  #setHandlers() {
    this.#pointComponent.setOpenClickHandler(() => {
      this.#openEditor();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.#closeEditor();
    });

    this.#pointEditComponent.setSubmitHandler((update) => {
      this.#closeEditor();
      this.#onUpdate(
        UserAction.UPDATE_POINT,
        UpdateType.TRIP,
        update
      );
    });

    this.#pointComponent.setFavoriteClickHandler(() => {
      this.#toggleFavorites();
    });

    this.#pointEditComponent.setDeleteHandler((deletedPoint) => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#onUpdate(
        UserAction.DELETE_POINT,
        UpdateType.TRIP,
        deletedPoint,
      );
    });
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
