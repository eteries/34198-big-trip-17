import { render } from '../render';
import FiltersView from '../view/filters/filters-view';

export default class FiltersPresenter {
  init = (filtersContainer, filtersModel) => {
    this.filtersContainer = filtersContainer;

    this.filtersModel = filtersModel;
    this.filters = [...this.filtersModel.getFilters()];
    this.activeFilter = this.filtersModel.getActiveFilter();

    render(new FiltersView(this.filters, this.activeFilter), this.filtersContainer);
  };
}
