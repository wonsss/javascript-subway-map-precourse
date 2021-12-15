import { elements as $ } from './util/elements.js';

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
    this.view.showStationManagerTab();
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
    this.view.showStationManagerTab();
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
    console.log(this.model._stationObj);
  }
}
