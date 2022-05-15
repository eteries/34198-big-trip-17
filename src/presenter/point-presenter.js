import { render } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import PointView from '../view/point/point-view';
import PointEditView from '../view/point-edit/point-edit-view';

export default class PointPresenter {
  #container;
  #pointComponent;
  #pointEditComponent;

  constructor(container) {
    this.#container = container;
  }

  init(point, destinations, offers) {
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point, destinations, offers);

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

    render(this.#pointComponent, this.#container);
  }

  #openEditor() {
    this.#pointComponent.element.replaceWith(this.#pointEditComponent.element);
  }

  #closeEditor() {
    this.#pointEditComponent.element.replaceWith(this.#pointComponent.element);
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closeEditor();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
