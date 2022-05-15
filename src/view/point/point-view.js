import AbstractView from '../../framework/view/abstract-view';

import { createPointTemplate } from './point.tpl';

export default class PointView extends AbstractView {
  #point;

  constructor(point) {
    super();

    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setOpenClickHandler(cb) {
    this._callback.onOpenClick = cb;
    const openButton = this.element.querySelector('.event__rollup-btn');
    openButton.addEventListener('click', this._callback.onOpenClick);
  }

  setFavoriteClickHandler(cb) {
    this._callback.onFavoriteClick = cb;
    const favoriteButton = this.element.querySelector('.event__favorite-btn');
    favoriteButton.addEventListener('click', this._callback.onFavoriteClick);
  }
}
