import DestinationsModel from './model/destinations-model';
import FiltersModel from './model/filters-model';
import TripModel from './model/trip-model';
import OffersModel from './model/offers-model';
import FiltersPresenter from './presenter/filters-presenter';
import HeaderPresenter from './presenter/header-presenter';
import TripPresenter from './presenter/trip-presenter';

const headerPresenter = new HeaderPresenter();
const filtersPresenter = new FiltersPresenter();
const tripPresenter = new TripPresenter();

const tripModel = new TripModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

headerPresenter.init(mainElement, tripInfoElement, tripModel);
filtersPresenter.init(filtersElement, filtersModel);
tripPresenter.init(eventsElement, tripModel, destinationsModel, offersModel);
