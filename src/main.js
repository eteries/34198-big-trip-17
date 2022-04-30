import TripModel from './model/trip-model';
import TripPresenter from './presenter/trip-presenter';
import { render } from './render';
import CostView from './view/cost/cost-view';
import FiltersView from './view/filters/filters-view';
import NewPointButtonView from './view/new-point-button/new-point-button-view';
import RouteView from './view/route/route-view';

const tripPresenter = new TripPresenter();
const tripModel = new TripModel();

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

render(new RouteView(), tripInfoElement);
render(new CostView(), tripInfoElement);
render(new NewPointButtonView(), mainElement);
render(new FiltersView(), filtersElement);

tripPresenter.init(eventsElement, tripModel);
