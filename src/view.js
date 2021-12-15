export default class SubwayView {
  constructor(
    model,
    {
      app,
      stationManagerTab,
      lineManagerTab,
      sectionManagerTab,
      mapPrintManagerTab,
    }
  ) {
    this.model = model;
    this.app = app;
    this.stationManagerTab = stationManagerTab;
    this.lineManagerTab = lineManagerTab;
    this.sectionManagerTab = sectionManagerTab;
    this.mapPrintManagerTab = mapPrintManagerTab;
  }

  renderInApp(position, html) {
    this.app().insertAdjacentHTML(position, html);
  }

  hideAllTabs() {
    this.stationManagerTab().classList.remove('show');
    this.lineManagerTab().classList.remove('show');
    this.sectionManagerTab().classList.remove('show');
    this.mapPrintManagerTab().classList.remove('show');
  }

  showStationManagerTab() {
    this.hideAllTabs();
    this.stationManagerTab().classList.add('show');
  }

  showLineManagerTab() {
    this.hideAllTabs();
    this.lineManagerTab().classList.add('show');
  }

  showSectionManagerTab() {
    this.hideAllTabs();
    this.sectionManagerTab().classList.add('show');
  }

  showMapPrintManagerTab() {
    this.hideAllTabs();
    this.mapPrintManagerTab().classList.add('show');
  }
}
