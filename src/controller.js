import { HTML, ELEMENTS } from './util/elements.js';

export default class SubwayController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  app() {
    this.view.renderInApp('beforeend', HTML.topMenuContainerHTML);
    this.view.renderInApp('beforeend', HTML.stationManagerTabHTML);
    this.view.renderInApp('beforeend', HTML.lineManagerTabHTML);
    this.view.renderInApp('beforeend', HTML.sectionManagerTabHTML);
    this.view.renderInApp('beforeend', HTML.mapPrintManagerTabHTML);
    this.addAllEvents();
    this.view.showStationManagerTab();
  }

  addAllEvents() {
    ELEMENTS.stationManagerButton().addEventListener('click', () =>
      this.loadStationManagerTab()
    );
    ELEMENTS.lineManagerButton().addEventListener('click', () =>
      this.loadLineManagerTab()
    );
    ELEMENTS.sectionManagerButton().addEventListener('click', () =>
      this.loadSectionManagerTab()
    );
    ELEMENTS.mapPrintManagerButton().addEventListener('click', () =>
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
