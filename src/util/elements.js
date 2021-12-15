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
  <h3>역 이름</h3>
  <form>
    <input type="text" id="${ID.stationNameInput}" placeholder="역 이름을 입력해주세요."/>
    <input type="submit" id="${ID.stationAddButton}" value="역 추가"/>
  </form>
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

`,

  lineManagerTabHTML: `
<div class="${CLASS.lineManagerTab}">2</div>
`,

  sectionManagerTabHTML: `
<div class="${CLASS.sectionManagerTab}">3</div>
`,

  mapPrintManagerTabHTML: `
<div class="${CLASS.mapPrintManagerTab}">4</div>
`,

  stationTbody: name => `
<tr>
  <td>${name}</td>
  <td><button class="${CLASS.stationDeleteButton}">삭제</button></td>
</tr>
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
  stationManagerTab: () =>
    document.querySelector(`.${CLASS.stationManagerTab}`),
  lineManagerTab: () => document.querySelector(`.${CLASS.lineManagerTab}`),
  sectionManagerTab: () =>
    document.querySelector(`.${CLASS.sectionManagerTab}`),
  mapPrintManagerTab: () =>
    document.querySelector(`.${CLASS.mapPrintManagerTab}`),
  stationDeleteButtons: () =>
    document.querySelectorAll(`.${CLASS.stationDeleteButton}`),
  lineDeleteButton: () => document.querySelector(`.${CLASS.lineDeleteButton}`),
  sectionLineMenuButton: () =>
    document.querySelector(`.${CLASS.sectionLineMenuButton}`),
  sectionDeleteButton: () =>
    document.querySelector(`.${CLASS.sectionDeleteButton}`),
});

export { elements };
