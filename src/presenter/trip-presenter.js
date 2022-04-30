import { render } from '../render';
import PointsView from '../view/points/points-view';
import PointEditView from '../view/point-edit/point-edit-view';
import PointView from '../view/point/point-view';
import SortingView from '../view/sorting/sorting-view';

export default class TripPresenter {
  pointsComponent = new PointsView();

  init = (tripContainer, tripModel) => {
    this.tripContainer = tripContainer;
    this.tripModel = tripModel;
    this.points = [...this.tripModel.points];

    render(new SortingView(), this.tripContainer);
    render(this.pointsComponent, this.tripContainer);
    render (new PointEditView(), this.pointsComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView(this.points[i]), this.pointsComponent.getElement());
    }
  };
}
