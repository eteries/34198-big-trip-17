import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

import { createNewPointButtonTemplate } from './new-point-button.tpl';


export default class NewPointButtonView extends AbstractStatefulView {
  get template() {
    return createNewPointButtonTemplate(this._state.isDisabled);
  }

  setNewPointButtonClickHandler(cb) {
    this._callback.onNewButtonClick = cb;
    this.element.addEventListener('click', this._callback.onNewButtonClick);
  }

  _restoreHandlers = () => {
    this.setNewPointButtonClickHandler(this._callback.onNewButtonClick);
  };
}
