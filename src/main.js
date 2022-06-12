import DestinationsModel from './model/destinations-model';
import FiltersModel from './model/filters-model';
import TripModel from './model/trip-model';
import OffersModel from './model/offers-model';
import FiltersPresenter from './presenter/filters-presenter';
import HeaderPresenter from './presenter/header-presenter';
import TripPresenter from './presenter/trip-presenter';
import PointsApiService from './services/points-api-service';
import { AUTHORIZATION, END_POINT } from './constants';
import DestinationsApiService from './services/destinations-api-service';
import OffersApiService from './services/offers-api-service';

const tripInfoElement = document.querySelector('.trip-info');
const filtersElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector('.trip-events');

const tripModel = new TripModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const filtersModel = new FiltersModel();

new TripPresenter(eventsElement, mainElement, tripModel, destinationsModel, offersModel, filtersModel);
new HeaderPresenter(tripInfoElement, tripModel, offersModel, destinationsModel);
new FiltersPresenter(filtersElement, filtersModel, tripModel);
