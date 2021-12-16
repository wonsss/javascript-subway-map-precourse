import { KEY } from './util/constants.js';

export default class SubwayModel {
  constructor() {
    this._stationObj = {};
    this._lineObj = {};
  }

  get stationObj() {
    return this._stationObj ?? {};
  }

  get lineObj() {
    return this._lineObj ?? {};
  }

  setStationObj(stationName) {
    this.stationObj[stationName] = { lineName: null };
    this.setLocalStorage(KEY.station, this.stationObj);
  }

  deleteStationInObj(stationName) {
    delete this._stationObj[stationName];
    this.setLocalStorage(KEY.station, this.stationObj);
  }

  setLineObjInitially(lineName, startStation, endStation) {
    this.lineObj[lineName] = [startStation, endStation];
    this.setLocalStorage(KEY.line, this.lineObj);
  }

  addStationToLineObj(lineName, order, stationName) {
    this.lineObj[lineName].splice(order, 0, stationName);
  }

  deleteLineInObj(lineName) {
    delete this.lineObj[lineName];
    this.setLocalStorage(KEY.line, this.lineObj);
  }

  setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  loadAllDataFromLocalStorage() {
    this._stationObj = this.getLocalStorage(KEY.station) ?? {};
    this._lineObj = this.getLocalStorage(KEY.line) ?? {};
  }
}
