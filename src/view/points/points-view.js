import AbstractView from '../../framework/view/abstract-view';

import { createPointsTemplate } from './points.tpl';

export default class PointsView extends AbstractView {
  get template() {
    return createPointsTemplate();
  }
}
