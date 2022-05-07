import AbstractView from '../../framework/view/abstract-view';

import { createNewPointButtonTemplate } from './new-point-button.tpl';

export default class NewPointButtonView extends AbstractView {
  get template() {
    return createNewPointButtonTemplate();
  }
}
