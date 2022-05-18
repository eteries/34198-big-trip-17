import { Mode } from '../constants';
import { render } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import PointView from '../view/point/point-view';
import PointEditView from '../view/point-edit/point-edit-view';
import { getOffersByType } from '../utils/filter';

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
    this.#offers = getOffersByType(offers, this.#point.type);

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
    this.#pointComponent.removeElement();
    this.#pointEditComponent.removeElement();
  }

  #openEditor() {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
    this.#onOpen();
    this.#mode = Mode.Open;
  }

  #closeEditor() {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
    this.#mode = Mode.Closed;
  }

  #renderPoint() {
    render(this.#pointComponent, this.#container);
  }

  #toggleFavorites() {
    this.#onUpdate({
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
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setSubmitHandler(() => {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointComponent.setFavoriteClickHandler(() => {
      this.#toggleFavorites();
    });
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
