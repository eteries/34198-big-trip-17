import { Filter, UpdateType } from '../constants';
import { remove, render } from '../framework/render';
import FiltersView from '../view/filters/filters-view';
import { mapFilterToAmount } from '../utils/filters';

export default class FiltersPresenter {
  #container;
  #filtersComponent = null;
  #filtersModel;
  #tripModel;

  constructor(container, filtersModel, tripModel) {
    this.#container = container;
    this.#filtersModel = filtersModel;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#init();
  }

  #init() {
    this.#createOrUpdateView();
  }

  get filters() {
    return this.#filtersModel.filters
      .map((filter) => mapFilterToAmount(filter, this.#tripModel.points));
  }

  #createOrUpdateView() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(this.filters, this.#filtersModel.currentFilter);
    this.#filtersComponent.setFilterChangeHandler(this.#handleFilterChange);

    if (!prevFiltersComponent) {
      this.#renderFilters();
      return;
    }

    prevFiltersComponent.element.replaceWith(this.#filtersComponent.element);
    remove(prevFiltersComponent);
  }

  destroy() {
    remove(this.#filtersComponent);
    this.#filtersComponent = null;

    this.#tripModel.removeObserver(this.#handleModelEvent);
    this.#filtersModel.removeObserver(this.#handleModelEvent);

    this.#filtersModel.setFilter(UpdateType.TRIP, Filter.EVERYTHING);
  }

  #renderFilters() {
    render(this.#filtersComponent, this.#container);
  }

  #handleModelEvent = () => {
    this.#createOrUpdateView();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.TRIP, filterType);
  };
}
