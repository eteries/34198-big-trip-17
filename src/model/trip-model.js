import { Mock } from '../mock';
import { generatePoint } from '../mock/point';

export default class TripModel {
  points = Array.from({length: Mock.POINTS_NUM}, generatePoint);

  getPoints = () => this.points;
}
