import { KEY } from './util/constants.js';

export default class SubwayModel {
  constructor() {
    this._stationObj = {};
    this._lineObj = {};
  }

  get stationObj() {
    return this._stationObj;
  }

  setStationObj(stationName) {
    this._stationObj[stationName] = { lineName: null };
    this.setLocalStorage(KEY.station, this._stationObj);
  }

  deleteStationInObj(stationName) {
    delete this._stationObj[stationName];
    this.setLocalStorage(KEY.station, this._stationObj);
  }

  setLineObjInitially(lineName, firstStation, lastStation) {
    this._lineObj[lineName] = [firstStation, lastStation];
  }

  addStationToLineObj(lineName, index, stationName) {
    this._lineObj[lineName] = this._lineObj[lineName].splice(
      index,
      0,
      stationName
    );
  }

  setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  loadAllDataFromLocalStorage() {
    this._stationObj = this.getLocalStorage(KEY.station);
    this._lineObj = this.getLocalStorage(KEY.line);
  }
}
