export default class TripModel {
  #points;

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
