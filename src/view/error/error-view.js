import AbstractView from '../../framework/view/abstract-view';

import { createErrorTemplate } from './error.tpl';

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
