import { render } from '../render';
import PointsView from '../view/points/points-view';
import PointEditView from '../view/point-edit/point-edit-view';
import PointView from '../view/point/point-view';
import SortingView from '../view/sorting/sorting-view';

export default class TripPresenter {
  pointsComponent = new PointsView();

  init = (tripContainer, tripModel, destinationsModel, offersModel) => {
    this.tripContainer = tripContainer;

    this.tripModel = tripModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;

    this.points = [...this.tripModel.getPoints()];
    this.destinations = [...this.destinationsModel.getDestinations()];
    this.offers = [...this.offersModel.getOffers()];

    render(new SortingView(), this.tripContainer);
    render(this.pointsComponent, this.tripContainer);

    for (let i = 0; i < this.points.length; i++) {
      if (i === 0) {
        render(new PointEditView(this.points[i], this.destinations, this.offers), this.pointsComponent.getElement());
        continue;
      }

      render(new PointView(this.points[i]), this.pointsComponent.getElement());
    }
  };
}
