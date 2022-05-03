const createFiltersListTemplate = (filters, activeFilter) => (
  filters
    .map((name) => (
      `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${activeFilter === name ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
    ))
    .join('')
);

export const createFiltersTemplate = (filters, activeFilter) => {
  const filtersListTemplate = createFiltersListTemplate(filters, activeFilter);

  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filtersListTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
     </div>`
  );
};
