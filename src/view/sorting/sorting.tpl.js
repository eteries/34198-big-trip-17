const createSortingListTemplate = (sortTypes, currentSort) => (
  Object.values(sortTypes)
    .map((name) => {
      const checked = name === currentSort ? 'checked': '';
      const disabled = (name === sortTypes.EVENT || name === sortTypes.OFFERS) ? 'disabled' : '';

      return (
        `<div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${checked} ${disabled} data-sort="${name}">
          <label class="trip-sort__btn" for="sort-${name}">${name}</label>
        </div>`
      );
    })
    .join('')
);

export const createSortingTemplate = (sortTypes, currentSort) => {
  const sortingListTemplate = createSortingListTemplate(sortTypes, currentSort);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingListTemplate}
    </form>`
  );
};
