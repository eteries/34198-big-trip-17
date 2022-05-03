import { render } from '../render';
import RouteView from '../view/route/route-view';
import CostView from '../view/cost/cost-view';
import NewPointButtonView from '../view/new-point-button/new-point-button-view';
import { calculateCost, calculateTripEnd, calculateTripStart } from '../utils/calculate';
import { getUniqueDestinations } from '../utils/filter';

export default class HeaderPresenter {
  init = (headerContainer, infoContainer, tripModel) => {
    this.headerContainer = headerContainer;
    this.infoContainer = infoContainer;

    this.tripModel = tripModel;

    this.points = [...this.tripModel.getPoints()];

    this.cost = calculateCost(this.points);
    this.uniqueDestinations = getUniqueDestinations(this.points);
    this.startDate = calculateTripStart(this.points);
    this.endDate = calculateTripEnd(this.points);


    render(new RouteView(this.uniqueDestinations, this.startDate, this.endDate), this.infoContainer);
    render(new CostView(this.cost), this.infoContainer);
    render(new NewPointButtonView(), this.headerContainer);
  };
}
