import { CLASS } from './util/constants.js';

export default class SubwayView {
  constructor(model, elements) {
    this.model = model;
    this.$ = elements;
  }

  renderInTarget(target, html) {
    target.insertAdjacentHTML('beforeend', html);
  }

  renderInLineStartSelector(html) {
    this.$.lineStartStationSelector().insertAdjacentHTML('beforeend', html);
    this.$.lineEndStationSelector().insertAdjacentHTML('beforeend', html);
  }

  renderInSectionStationSelector(html) {
    this.$.sectionStationSelector().insertAdjacentHTML('beforeend', html);
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

  clearTarget(target) {
    if (target) {
      target.innerHTML = '';
    }
  }
}
