import { render } from '../framework/render';
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

  constructor(container, onUpdate) {
    this.#container = container;

    this.#onUpdate = onUpdate;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point);
    this.#pointEditComponent = new PointEditView(this.#point, this.#destinations, this.#offers);

    this.#setHandlers();

    if (prevPointComponent === null || prevPointEditComponent === null) {
      this.#renderPoint();
      return;
    }

    prevPointComponent.element.replaceWith(this.#pointComponent.element);
    prevPointEditComponent.element.replaceWith(this.#pointEditComponent.element);

    prevPointComponent.removeElement();
    prevPointEditComponent.removeElement();
  }

  #openEditor() {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
  }

  #closeEditor() {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
  }

  #renderPoint() {
    render(this.#pointComponent, this.#container);
  }

  #toggleFavorites() {
    this.#onUpdate({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
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
