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
  #onClose;

  constructor(container, onUpdate, onOpen, onClose) {
    this.#container = container;

    this.#onUpdate = onUpdate;
    this.#onOpen = onOpen;
    this.#onClose = onClose;
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
    this.#onClose();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#pointEditComponent.removeDatepickers();
    remove(this.#pointEditComponent);
  }

  openEditor() {
    this.#onOpen();
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #setHandlers() {
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#pointEditComponent.setCloseClickHandler(() => this.destroy());
    this.#pointEditComponent.setDeleteHandler(() => this.destroy());

    this.#pointEditComponent.setSubmitHandler((update) => {
      this.#onUpdate(
        UserAction.ADD_POINT,
        UpdateType.TRIP,
        update
      );
    });
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
