import { CLASS } from './util/constants.js';

export default class SubwayView {
  constructor(model, elements) {
    this.model = model;
    this.$ = elements;
  }

  renderInApp(position, html) {
    this.$.app().insertAdjacentHTML(position, html);
  }

  hideAllTabs() {
    this.$.stationManagerTab().classList.remove(CLASS.show);
    this.$.lineManagerTab().classList.remove(CLASS.show);
    this.$.sectionManagerTab().classList.remove(CLASS.show);
    this.$.mapPrintManagerTab().classList.remove(CLASS.show);
  }

  showStationManagerTab() {
    this.hideAllTabs();
    this.$.stationManagerTab().classList.add(CLASS.show);
  }

  showLineManagerTab() {
    this.hideAllTabs();
    this.$.lineManagerTab().classList.add(CLASS.show);
  }

  showSectionManagerTab() {
    this.hideAllTabs();
    this.$.sectionManagerTab().classList.add(CLASS.show);
  }

  showMapPrintManagerTab() {
    this.hideAllTabs();
    this.$.mapPrintManagerTab().classList.add(CLASS.show);
  }

  renderTable(table, data) {
    table.insertAdjacentHTML('beforeend', data);
    this.$.stationNameInput().value = '';
  }

  removeRowOfTable(event) {
    event.target.parentElement.parentElement.remove();
  }

  clearTable(table) {
    table.innerHTML = '';
  }
}
