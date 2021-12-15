import * as $ from './util/elements.js';

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
}
