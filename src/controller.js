import { elements as $ } from './util/elements.js';
import { ID, KEY } from './util/constants.js';

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
      this.addStationBtnHandler.call(this, e)
    );
    $.lineAddButton().addEventListener('click', e =>
      this.addLineBtnHandler.call(this, e)
    );
  }

  loadStationManagerTab() {
    this.view.clearTable($.stationTable());
    const stationObj = this.model.getLocalStorage(KEY.station);
    Object.keys(stationObj).forEach(stationName => {
      this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    });
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', this.stationDeleteBtnHandler)
    );
    this.view.showStationManagerTab();
  }

  loadLineManagerTab() {
    const { stationObj } = this.model;
    Object.keys(stationObj).forEach(stationName => {
      const optionHTML = $.lineStartStationSelectorOption(stationName);
      this.view.renderInLineStartSelector(optionHTML);
    });
    this.view.showLineManagerTab();
  }

  loadSectionManagerTab() {
    this.view.showSectionManagerTab();
  }

  loadMapPrintManagerTab() {
    this.view.showMapPrintManagerTab();
  }

  addStationBtnHandler(e) {
    e.preventDefault();
    const stationName = $.stationNameInput().value;
    this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', this.stationDeleteBtnHandler)
    );
    this.model.setStationObj(stationName);
  }

  addLineBtnHandler(e) {
    e.preventDefault();
    const lineName =
      document.forms[ID.lineAddButton].elements[ID.lineNameInput].value;
    const startStation =
      document.forms[ID.lineAddButton].elements[ID.lineStartStationSelector]
        .value;
    const endStation =
      document.forms[ID.lineAddButton].elements[ID.lineEndStationSelector]
        .value;
    this.view.renderTable(
      $.lineTable(),
      $.lineTbody(lineName, startStation, endStation)
    );
    $.lineDeleteButtons().forEach(button =>
      button.addEventListener('click', this.lineDeleteBtnHandler)
    );
  }

  test(e) {
    console.log(e.target);
  }

  stationDeleteBtnHandler = event => {
    console.log(event);
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      this.view.removeRowOfTable(event);
      const stationName =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteStationInObj(stationName);
    }
  };

  lineDeleteBtnHandler = event => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      this.view.removeRowOfTable(event);
      //   const stationName =
      //     event.target.parentElement.parentElement.childNodes[1].innerText;
      //   this.model.deleteStationInObj(stationName);
    }
  };
}
