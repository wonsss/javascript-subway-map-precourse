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
    this.loadTableInStationManagerTab();
    this.view.showStationManagerTab();
  }

  loadTableInStationManagerTab() {
    this.view.clearTarget($.stationTable());
    const stationObj = this.model.getLocalStorage(KEY.station) ?? {};
    Object.keys(stationObj).forEach(stationName => {
      this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    });
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', this.stationDeleteBtnHandler)
    );
  }

  loadLineManagerTab() {
    this.loadOptionsInLineManagerTab();
    this.loadTableInLineManagerTab();
    this.view.showLineManagerTab();
  }

  loadOptionsInLineManagerTab() {
    this.view.clearTarget($.lineStartStationSelector());
    this.view.clearTarget($.lineEndStationSelector());
    const { stationObj } = this.model;
    Object.keys(stationObj).forEach(stationName => {
      const optionHTML = $.lineStartStationSelectorOption(stationName);
      this.view.renderInLineStartSelector(optionHTML);
    });
  }

  loadTableInLineManagerTab() {
    this.view.clearTarget($.lineTable());
    const lineObj = this.model.getLocalStorage(KEY.line) ?? {};
    Object.keys(lineObj).forEach(lineName => {
      this.view.renderTable(
        $.lineTable(),
        $.lineTbody(
          lineName,
          lineObj[lineName][0],
          lineObj[lineName][lineObj[lineName].length - 1]
        )
      );
    });
    $.lineDeleteButtons().forEach(button =>
      button.addEventListener('click', this.lineDeleteBtnHandler)
    );
  }

  loadSectionManagerTab() {
    this.view.clearTarget($.lineListButtons());
    const lineList = Object.keys(this.model.lineObj);
    lineList.forEach(line => {
      this.view.renderInTarget($.lineListButtons(), $.makeButton(line));
    });
    $.sectionLineMenuButtons().forEach(button => {
      button.addEventListener('click', this.sectionLineMenuBtnHandler);
    });
    this.view.showSectionManagerTab();
  }

  sectionLineMenuBtnHandler = e => {
    $.eachSections().forEach(section => {
      this.view.clearTarget(section);
    });
    const lineName = e.target.innerText;
    const stationList = this.model.lineObj[lineName];
    this.view.renderInTarget(
      $.sectionManagerTab(),
      $.eachSectionManagerTab(lineName, stationList)
    );
    this.loadOptionInSectionManagerTab();
  };

  loadOptionInSectionManagerTab() {
    this.view.clearTarget($.sectionStationSelector());
    const { stationObj } = this.model;
    Object.keys(stationObj).forEach(stationName => {
      const optionHTML = $.lineStartStationSelectorOption(stationName);
      this.view.renderInSectionStationSelector(optionHTML);
    });
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
    this.model.setLineObjInitially(lineName, startStation, endStation);
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
      const lineName =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteLineInObj(lineName);
    }
  };
}
