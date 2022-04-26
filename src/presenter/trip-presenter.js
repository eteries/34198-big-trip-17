import { render } from '../render';
import PointsView from '../view/points-view';
import PointEditView from '../view/point-edit-view';
import PointView from '../view/point-view';
import SortingView from '../view/sorting-view';

export default class TripPresenter {
  pointsComponent = new PointsView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new SortingView(), this.tripContainer);
    render(this.pointsComponent, this.tripContainer);
    render (new PointEditView(), this.pointsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointsComponent.getElement());
    }
  };
}
