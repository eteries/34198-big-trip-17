import { render } from './render.js';
import CostView from './views/cost-view.js';
import FiltersView from './views/filters-view.js';
import NewPointButtonView from './views/new-point-button-view.js';
import RouteView from './views/route-view.js';

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');

render(new RouteView(), tripInfoElement);
render(new CostView(), tripInfoElement);
render(new NewPointButtonView(), mainElement);
render(new FiltersView(), filtersElement);
