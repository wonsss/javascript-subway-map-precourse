import { elements as $ } from './util/elements.js';
import { ID, KEY, MESSAGE } from './util/constants.js';

export default class SubwayController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  app() {
    this.view.renderInTarget($.app(), $.topMenuContainerHTML);
    this.view.renderInTarget($.app(), $.stationManagerTabHTML);
    this.view.renderInTarget($.app(), $.lineManagerTabHTML);
    this.view.renderInTarget($.app(), $.sectionManagerTabHTML);
    this.view.renderInTarget($.app(), $.mapPrintManagerTabHTML);
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
    this.currentLine = lineName;
    this.view.renderInTarget(
      $.sectionManagerTab(),
      $.eachSectionManagerTab(lineName)
    );
    this.loadOptionInSectionManagerTab();
    this.loadTableInSectionManagerTab(lineName);
    $.sectionAddButton().addEventListener('click', event =>
      this.registerStationToSection(event, lineName)
    );
  };

  registerStationToSection(event, lineName) {
    event.preventDefault();
    const stationName =
      document.forms[ID.sectionAddButton].elements[ID.sectionStationSelector]
        .value;
    const order =
      document.forms[ID.sectionAddButton].elements[ID.sectionOrderInput].value;
    this.model.addStationToLineObj(lineName, order, stationName);
    this.loadTableInSectionManagerTab(lineName);
    this.model.setLocalStorage(KEY.line, this.model.lineObj);
  }

  loadOptionInSectionManagerTab() {
    this.view.clearTarget($.sectionStationSelector());
    const { stationObj } = this.model;
    Object.keys(stationObj).forEach(stationName => {
      const optionHTML = $.lineStartStationSelectorOption(stationName);
      this.view.renderInSectionStationSelector(optionHTML);
    });
  }

  loadTableInSectionManagerTab(lineName) {
    this.view.clearTarget($.sectionTable());
    const lineStationList = this.model.lineObj[lineName];
    for (let i = 0; i < lineStationList.length; i++) {
      this.view.renderTable(
        $.sectionTable(),
        $.sectionTbody(i, lineStationList[i])
      );
    }
    $.sectionDeleteButtons().forEach(button =>
      button.addEventListener('click', event =>
        this.sectionDeleteBtnHandler(event, lineName)
      )
    );
  }

  sectionDeleteBtnHandler = (event, lineName) => {
    if (this.checkStationBeforeDeleteFromSection(lineName)) {
      return;
    }

    if (window.confirm(MESSAGE.confirmOfDelete)) {
      const order =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteStationFromLineObj(lineName, order);
      this.model.setLocalStorage(KEY.line, this.model.lineObj);
      this.loadTableInSectionManagerTab(lineName);
    }
  };

  checkStationBeforeDeleteFromSection(lineName) {
    if (this.model.lineObj[lineName].length < 3) {
      alert(MESSAGE.alertOfUnderTwoStation);
      return true;
    }
  }

  loadMapPrintManagerTab() {
    this.view.clearTarget($.mapDiv());
    this.view.renderInTarget($.mapDiv(), this.createEachLineHTML());
    this.view.showMapPrintManagerTab();
  }

  createEachLineHTML() {
    const { lineObj } = this.model;
    const lineNameList = Object.keys(lineObj);
    let html = '';
    lineNameList.forEach(lineName => {
      html += `
<h2>${lineName}</h2>
<ul>`;
      lineObj[lineName].forEach(station => {
        html += `
<li>${station}</li>
              `;
      });
      html += `</ul>`;
    });
    return html;
  }

  addStationBtnHandler(e) {
    e.preventDefault();
    const stationName = $.stationNameInput().value;
    if (this.checkStationBeforeRegister(stationName)) {
      return;
    }
    this.view.renderTable($.stationTable(), $.stationTbody(stationName));
    $.stationDeleteButtons().forEach(button =>
      button.addEventListener('click', this.stationDeleteBtnHandler)
    );
    this.model.setStationObj(stationName);
  }

  checkStationBeforeRegister(stationName) {
    if (stationName.length < 2) {
      alert(MESSAGE.alertOfShortStationName);
      return true;
    }
    for (const station in this.model.stationObj) {
      if (station === stationName) {
        alert(MESSAGE.alertOfStationNameThatAlreadyExists);
        return true;
      }
    }
  }

  addLineBtnHandler(e) {
    e.preventDefault();
    const lineName =
      document.forms[ID.lineAddButton].elements[ID.lineNameInput].value;
    if (this.checkLineBeforeRegister(lineName)) {
      return;
    }
    const startStation =
      document.forms[ID.lineAddButton].elements[ID.lineStartStationSelector]
        .value;
    const endStation =
      document.forms[ID.lineAddButton].elements[ID.lineEndStationSelector]
        .value;
    if (this.checkStationBeforeRegister(startStation, endStation)) {
      return;
    }
    this.view.renderTable(
      $.lineTable(),
      $.lineTbody(lineName, startStation, endStation)
    );
    $.lineDeleteButtons().forEach(button =>
      button.addEventListener('click', this.lineDeleteBtnHandler)
    );
    this.model.setLineObjInitially(lineName, startStation, endStation);
  }

  checkLineBeforeRegister(lineName) {
    if (lineName.length < 3) {
      alert(MESSAGE.alertOfShortLineName);
      return true;
    }
    for (const line in this.model.lineObj) {
      if (line === lineName) {
        alert(MESSAGE.alertOfLineNameThatAlreadyExists);
        return true;
      }
    }
  }

  checkStationBeforeRegister(startStation, endStation) {
    if (startStation === endStation) {
      alert(MESSAGE.alertOfSameEndpoints);
      return true;
    }
  }

  stationDeleteBtnHandler = event => {
    const stationName =
      event.target.parentElement.parentElement.childNodes[1].innerText;
    if (this.checkStationIfRegistered(stationName)) return;
    if (!window.confirm(MESSAGE.confirmOfDelete)) return;

    this.view.removeRowOfTable(event);
    this.model.deleteStationInObj(stationName);
  };

  checkStationIfRegistered(stationName) {
    const { lineObj } = this.model;
    for (const line in lineObj) {
      if (checkLine(lineObj, line, stationName)) return true;
    }
    function checkLine(lineObj, line, stationName) {
      for (let i = 0; i < lineObj[line].length; i++) {
        if (lineObj[line][i] === stationName) {
          alert(MESSAGE.alertOfCannotDeleteStationRegistered);
          return true;
        }
      }
    }
  }

  lineDeleteBtnHandler = event => {
    if (window.confirm(MESSAGE.confirmOfDelete)) {
      this.view.removeRowOfTable(event);
      const lineName =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteLineInObj(lineName);
    }
  };
}
