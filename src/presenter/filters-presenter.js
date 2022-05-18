import { render } from '../framework/render';
import FiltersView from '../view/filters/filters-view';

export default class FiltersPresenter {
  init(filtersContainer, filtersModel) {
    this.filtersContainer = filtersContainer;

    this.filtersModel = filtersModel;
    this.filters = [...this.filtersModel.filters];
    this.activeFilter = this.filtersModel.activeFilter;

    render(new FiltersView(this.filters, this.activeFilter), this.filtersContainer);
  }
}
