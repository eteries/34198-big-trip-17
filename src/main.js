import DestinationsModel from './model/destinations-model';
import TripModel from './model/trip-model';
import OffersModel from './model/offers-model';
import HeaderPresenter from './presenter/header-presenter';
import TripPresenter from './presenter/trip-presenter';
import { render } from './render';
import FiltersView from './view/filters/filters-view';

const headerPresenter = new HeaderPresenter();
const tripPresenter = new TripPresenter();

const tripModel = new TripModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

headerPresenter.init(mainElement, tripInfoElement, tripModel);

render(new FiltersView(), filtersElement);

tripPresenter.init(eventsElement, tripModel, destinationsModel, offersModel);
