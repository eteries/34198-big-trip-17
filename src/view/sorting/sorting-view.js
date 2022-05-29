import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

import { createSortingTemplate } from './sorting.tpl';


export default class SortingView extends AbstractStatefulView {
  #sortTypes;
  #currentSort;

  constructor(sortTypes, currentSort) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSort = currentSort;
  }

  get template() {
    return createSortingTemplate(this.#sortTypes, this.#currentSort);
  }

  setSortingChangeHandler(cb) {
    this._callback.onSortingChange = cb;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = ({target}) => {
    this._callback.onSortingChange(target.dataset.sort);
  };

  _restoreHandlers = () => {
    this.setSortingChangeHandler(this._callback.onSortingChange);
  };
}
