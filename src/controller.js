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
    this.model.loadAllDataFromLocalStorage();
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
      this.addStationHandler.call(this, e)
    );
  }

  loadStationManagerTab() {
    this.view.clearTable($.stationTable());
    const stationObj = this.model.getLocalStorage(KEY.station);
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

  addStationHandler(e) {
    e.preventDefault();
    const stationName = $.stationNameInput().value;
    this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', event =>
        this.stationDeleteButtonHandler(event)
      )
    );
    this.model.setStationObj(stationName);
    console.log(this.model._stationObj);
    this.model.setLocalStorage(KEY.station, this.model._stationObj);
  }

  stationDeleteButtonHandler(event) {
    this.view.removeRowOfTable(event);
  }
}
