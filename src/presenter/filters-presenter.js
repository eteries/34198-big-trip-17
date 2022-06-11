import { Filter, UpdateType } from '../constants';
import { remove, render } from '../framework/render';
import FiltersView from '../view/filters/filters-view';

export default class FiltersPresenter {
  #container;
  #filtersComponent = null;
  #filtersModel;
  #pointsModel;

  constructor(container, filtersModel, pointsModel) {
    this.#container = container;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    this.#init();
  }

  #init() {
    this.#createOrUpdateView();
  }

  #createOrUpdateView() {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(this.#filtersModel.filters, this.#filtersModel.currentFilter);
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

    this.#pointsModel.removeObserver(this.#handleModelEvent);
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
