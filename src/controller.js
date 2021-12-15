import { elements as $ } from './util/elements.js';
import { KEY } from './util/constants.js';

export default class SubwayController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  app() {
    this.view.renderInApp('beforeend', $.topMenuContainerHTML);
    this.view.renderInApp('beforeend', $.stationManagerTabHTML);
    this.view.renderInApp('beforeend', $.lineManagerTabHTML);
    this.view.renderInApp('beforeend', $.sectionManagerTabHTML);
    this.view.renderInApp('beforeend', $.mapPrintManagerTabHTML);
    this.addAllEvents();
    this.loadStationManagerTab();
  }

  addAllEvents() {
    $.stationManagerButton().addEventListener('click', () =>
      this.loadStationManagerTab()
    );
    $.lineManagerButton().addEventListener('click', () =>
      this.loadLineManagerTab()
    );
    $.sectionManagerButton().addEventListener('click', () =>
      this.loadSectionManagerTab()
    );
    $.mapPrintManagerButton().addEventListener('click', () =>
      this.loadMapPrintManagerTab()
    );
    $.stationAddButton().addEventListener('click', e =>
      this.addStation.call(this, e)
    );
  }

  loadStationManagerTab() {
    const stationObj = this.model.getLocalStorage(KEY.station);
    console.log(stationObj);
    this.makeStationManagerTable(stationObj);
    this.view.showStationManagerTab();
  }

  makeStationManagerTable(stationObj) {
    Object.keys(stationObj).forEach(stationName => {
      this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    });
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', event =>
        this.view.removeRowOfTable(event)
      )
    );
  }

  loadLineManagerTab() {
    this.view.showLineManagerTab();
  }

  loadSectionManagerTab() {
    this.view.showSectionManagerTab();
  }

  loadMapPrintManagerTab() {
    this.view.showMapPrintManagerTab();
  }

  addStation(e) {
    e.preventDefault();
    const stationName = $.stationNameInput().value;
    this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', event =>
        this.view.removeRowOfTable(event)
      )
    );
    this.model.setStationObj(stationName);
    this.model.setLocalStorage(KEY.station, this.model._stationObj);
  }
}
