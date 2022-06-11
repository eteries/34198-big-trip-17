import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';
import { mapDtoToPoint, mapPointToDto } from '../utils/point';

export default class TripModel extends Observable {
  #pointsApiService = null;
  #points = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#init();
  }

  get points() {
    return this.#points;
  }

  async #init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(mapDtoToPoint);
    }
    catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT, this.#points);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(mapPointToDto(update));
      const updatedPoint = mapDtoToPoint(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    }
    catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(mapPointToDto(update));
      const newPoint = mapDtoToPoint(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    }
    catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete non-existing point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    }
    catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
