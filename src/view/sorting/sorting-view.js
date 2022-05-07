import AbstractView from '../../framework/view/abstract-view';

import { createSortingTemplate } from './sorting.tpl';

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
