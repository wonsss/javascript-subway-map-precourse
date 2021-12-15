export default class SubwayModel {
  constructor() {
    this._stationObj = {};
    this._lineObj = {};
  }

  setStationObj(stationName) {
    this._stationObj[stationName] = { lineName: null };
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
}
