import TripPresenter from './presenter/trip-presenter';
import { render } from './render.js';
import CostView from './view/cost-view.js';
import FiltersView from './view/filters-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import RouteView from './view/route-view.js';

const tripPresenter = new TripPresenter();

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

render(new RouteView(), tripInfoElement);
render(new CostView(), tripInfoElement);
render(new NewPointButtonView(), mainElement);
render(new FiltersView(), filtersElement);

tripPresenter.init(eventsElement);
