import { ID, CLASS } from './constants.js';

const elements = Object.freeze({
  topMenuContainerHTML: `      
<div>
    <button id="${ID.stationManagerButton}">1. 역 관리</button>
    <button id="${ID.lineManagerButton}">2. 노선 관리</button>
    <button id="${ID.sectionManagerButton}">3. 구간 관리</button>
    <button id="${ID.mapPrintManagerButton}">4. 지하철 노선도 출력</button>
</div>
`,

  stationManagerTabHTML: `
<div class="${CLASS.stationManagerTab}">
  <div>
    <h3>역 이름</h3>
    <form>
      <input type="text" id="${ID.stationNameInput}" placeholder="역 이름을 입력해주세요."/>
      <input type="submit" id="${ID.stationAddButton}" value="역 추가"/>
    </form>
  </div>
  <div>
    <h2>지하철 역 목록</h2>
    <table>
      <thead>
          <tr>
            <th>역 이름</th>
            <th>설정</th>
          </tr>
      </thead>
      <tbody id="${ID.stationTable}"></tbody>
    </table>
  </div>
</div>

`,

  lineManagerTabHTML: `
<div class="${CLASS.lineManagerTab}">
  <div>
    <h3>노선 이름</h3>
    <form name="${ID.lineAddButton}" >
      <input type="text" id="${ID.lineNameInput}" name="${ID.lineNameInput}" placeholder="노선 이름을 입력해주세요."/>
      <br/>
      <label for="${ID.lineStartStationSelector}">상행 종점</label>
      <select id="${ID.lineStartStationSelector}" name="${ID.lineStartStationSelector}">
      </select>
      <br/>
      <label for="${ID.lineEndStationSelector}">하행 종점</label>
      <select id="${ID.lineEndStationSelector}" name="${ID.lineEndStationSelector}">
      </select>
      <br/>
      <input type="submit" id="${ID.lineAddButton}" value="노선 추가"/>
    </form>
  </div>
  <div>
    <h2>지하철 노선 목록</h2>
    <table>
      <thead>
          <tr>
            <th>노선 이름</th>
            <th>상행 종점역</th>
            <th>하행 종점역</th>
            <th>설정</th>
          </tr>
      </thead>
      <tbody id="${ID.lineTable}"></tbody>
    </table>
  </div>
</div>
`,

  lineStartStationSelectorOption: stationName => `
<option value="${stationName}">${stationName}</option>
`,

  stationTbody: name => `
<tr>
  <td>${name}</td>
  <td><button class="${CLASS.stationDeleteButton}">삭제</button></td>
</tr>
  `,

  lineTbody: (lineName, startStation, endStation) => `
<tr>
  <td>${lineName}</td>
  <td>${startStation}</td>
  <td>${endStation}</td>
  <td><button class="${CLASS.lineDeleteButton}">삭제</button></td>
</tr>
`,

  sectionManagerTabHTML: `
<div class="${CLASS.sectionManagerTab}">
  <h3>구간을 수정할 노선을 선택주세요</h3>
  <div id="${ID.lineListButtons}"></div>
</div>
`,

  eachSectionManagerTab: lineName => `
<div class="${CLASS.eachSection}">
  <h3>${lineName} 관리</h3>
  <h4>구간 등록</h4>
  <form name="${ID.sectionAddButton}" >
    <select id="${ID.sectionStationSelector}" name="${ID.sectionStationSelector}">
    </select>
    <input type="number" id="${ID.sectionOrderInput}" name="${ID.sectionOrderInput}" placeholder="순서"/>
    <input type="submit" id="${ID.sectionAddButton}" value="등록"/>
  </form>
  <br/>
  <table>
    <thead>
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
    </thead>
    <tbody id="${ID.sectionTable}"></tbody>
  </table>
</div>
`,

  sectionTbody: (index, stationName) => `
<tr>
  <td>${index}</td>
  <td>${stationName}</td>
  <td><button class="${CLASS.sectionDeleteButton}">노선에서 제거</button></td>
</tr>
`,

  makeButton: name => `
<button class="${CLASS.sectionLineMenuButton}">${name}</button>  
`,

  mapPrintManagerTabHTML: `
<div class="${CLASS.mapPrintManagerTab}">4</div>
`,

  app: () => document.getElementById(ID.app),
  stationManagerButton: () => document.getElementById(ID.stationManagerButton),
  lineManagerButton: () => document.getElementById(ID.lineManagerButton),
  sectionManagerButton: () => document.getElementById(ID.sectionManagerButton),
  mapPrintManagerButton: () =>
    document.getElementById(ID.mapPrintManagerButton),
  stationNameInput: () => document.getElementById(ID.stationNameInput),
  stationAddButton: () => document.getElementById(ID.stationAddButton),
  lineNameInput: () => document.getElementById(ID.lineNameInput),
  lineStartStationSelector: () =>
    document.getElementById(ID.lineStartStationSelector),
  lineEndStationSelector: () =>
    document.getElementById(ID.lineEndStationSelector),
  lineAddButton: () => document.getElementById(ID.lineAddButton),
  sectionStationSelector: () =>
    document.getElementById(ID.sectionStationSelector),
  sectionOrderInput: () => document.getElementById(ID.sectionOrderInput),
  sectionAddButton: () => document.getElementById(ID.sectionAddButton),
  stationTable: () => document.getElementById(ID.stationTable),
  lineTable: () => document.getElementById(ID.lineTable),
  sectionTable: () => document.getElementById(ID.sectionTable),
  stationManagerTab: () =>
    document.querySelector(`.${CLASS.stationManagerTab}`),
  lineManagerTab: () => document.querySelector(`.${CLASS.lineManagerTab}`),
  sectionManagerTab: () =>
    document.querySelector(`.${CLASS.sectionManagerTab}`),
  mapPrintManagerTab: () =>
    document.querySelector(`.${CLASS.mapPrintManagerTab}`),
  stationDeleteButtons: () =>
    document.querySelectorAll(`.${CLASS.stationDeleteButton}`),
  lineDeleteButtons: () =>
    document.querySelectorAll(`.${CLASS.lineDeleteButton}`),
  sectionLineMenuButtons: () =>
    document.querySelectorAll(`.${CLASS.sectionLineMenuButton}`),
  sectionDeleteButtons: () =>
    document.querySelectorAll(`.${CLASS.sectionDeleteButton}`),
  lineListButtons: () => document.getElementById(ID.lineListButtons),
  eachSections: () => document.querySelectorAll(`.${CLASS.eachSection}`),
});

export { elements };
