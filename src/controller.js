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
    this.currentLine = lineName;
    // const stationList = this.model.lineObj[lineName];
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
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const order =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteStationFromLineObj(lineName, order);
      this.model.setLocalStorage(KEY.line, this.model.lineObj);
      this.loadTableInSectionManagerTab(lineName);
    }
  };

  loadMapPrintManagerTab() {
    this.view.showMapPrintManagerTab();
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
      alert('지하철 역은 2글자 이상이어야 합니다');
      return true;
    }
    for (const station in this.model.stationObj) {
      if (station === stationName) {
        alert('중복된 지하철 역 이름은 등록될 수 없습니다.');
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
    for (const line in this.model.lineObj) {
      if (line === lineName) {
        alert('중복된 지하철 노선 이름은 등록될 수 없습니다.');
        return true;
      }
    }
  }

  stationDeleteBtnHandler = event => {
    const stationName =
      event.target.parentElement.parentElement.childNodes[1].innerText;
    if (this.checkStationIfRegistered(stationName)) return;
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

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
          alert('노선에 등록된 역은 삭제할 수 없습니다.');
          return true;
        }
      }
    }
  }

  lineDeleteBtnHandler = event => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      this.view.removeRowOfTable(event);
      const lineName =
        event.target.parentElement.parentElement.childNodes[1].innerText;
      this.model.deleteLineInObj(lineName);
    }
  };
}
