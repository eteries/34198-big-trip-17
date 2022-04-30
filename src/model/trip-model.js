import { Mock } from '../constants';
import { generatePoint } from '../mock/point';

export default class TripModel {
  points = Array.from({length: Mock.POINTS_NUM}, generatePoint);

  getPoints = () => this.points;
}
