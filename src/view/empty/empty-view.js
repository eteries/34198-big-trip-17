import AbstractView from '../../framework/view/abstract-view';
import { mapFilterToMessage } from '../../utils/filters';

import { createEmptyTemplate } from './empty.tpl';

export default class EmptyView extends AbstractView {
  #currentFilter;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createEmptyTemplate(mapFilterToMessage(this.#currentFilter));
  }
}
