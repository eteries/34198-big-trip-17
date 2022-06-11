import { UpdateType, UserAction } from '../constants';
import { remove, render, RenderPosition } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import PointEditView from '../view/point-edit/point-edit-view';

export default class NewPointPresenter {
  #container;
  #pointEditComponent = null;

  #point;
  #destinations;
  #offers;

  #onUpdate;
  #onOpen;

  constructor(container, onUpdate, onOpen) {
    this.#container = container;

    this.#onUpdate = onUpdate;
    this.#onOpen = onOpen;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointEditComponent = new PointEditView(this.#point, this.#destinations, this.#offers);
    this.#setHandlers();
    this.#pointEditComponent.setDatepickers();
    render(this.#pointEditComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#setDefaultFocus();
  }

  reset() {
    this.destroy();
  }

  destroy() {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#pointEditComponent.removeDatepickers();
    remove(this.#pointEditComponent);
  }

  openEditor() {
    this.#onOpen();
  }

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #setHandlers() {
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#pointEditComponent.setCloseClickHandler(() => {
      this.destroy();
    });

    this.#pointEditComponent.setSubmitHandler((update) => {
      this.#onUpdate(
        UserAction.ADD_POINT,
        UpdateType.TRIP,
        update
      );
    });

    this.#pointEditComponent.setDeleteHandler(() => this.destroy());
  }

  #setDefaultFocus() {
    this.#pointEditComponent.element.querySelector('.event__input--destination')?.focus();
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };
}
