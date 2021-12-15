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
    this._stationObj[stationName] = { lineName: null };
    this.setLocalStorage(KEY.station, this._stationObj);
  }

  deleteStationInObj(stationName) {
    delete this._stationObj[stationName];
    this.setLocalStorage(KEY.station, this._stationObj);
  }

  setLineObjInitially(lineName, startStation, endStation) {
    this._lineObj[lineName] = [startStation, endStation];
    this.setLocalStorage(KEY.line, this._lineObj);
  }

  addStationToLineObj(lineName, index, stationName) {
    this._lineObj[lineName] = this._lineObj[lineName].splice(
      index,
      0,
      stationName
    );
  }

  deleteLineInObj(lineName) {
    delete this._lineObj[lineName];
    this.setLocalStorage(KEY.line, this._lineObj);
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
