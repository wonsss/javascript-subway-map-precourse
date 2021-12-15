import { ID, CLASS } from './constants.js';

const topMenuContainerHTML = `      
<div>
    <button id="${ID.stationManagerButton}">1. 역 관리</button>
    <button id="${ID.lineManagerButton}">2. 노선 관리</button>
    <button id="${ID.sectionManagerButton}">3. 구간 관리</button>
    <button id="${ID.mapPrintManagerButton}">4. 지하철 노선도 출력</button>
</div>
`;

const stationManagerTabHTML = `
<div class="${CLASS.stationManagerTab}">1</div>

`;

const lineManagerTabHTML = `
<div class="${CLASS.lineManagerTab}">2</div>
`;

const sectionManagerTabHTML = `
<div class="${CLASS.sectionManagerTab}">3</div>
`;

const mapPrintManagerTabHTML = `
<div class="${CLASS.mapPrintManagerTab}">4</div>
`;

const app = () => document.getElementById(ID.app);

const stationManagerTab = () =>
  document.querySelector(`.${CLASS.stationManagerTab}`);

const lineManagerTab = () => document.querySelector(`.${CLASS.lineManagerTab}`);

const sectionManagerTab = () =>
  document.querySelector(`.${CLASS.sectionManagerTab}`);

const mapPrintManagerTab = () =>
  document.querySelector(`.${CLASS.mapPrintManagerTab}`);

const stationManagerButton = () =>
  document.getElementById(ID.stationManagerButton);

const lineManagerButton = () => document.getElementById(ID.lineManagerButton);

const sectionManagerButton = () =>
  document.getElementById(ID.sectionManagerButton);

const mapPrintManagerButton = () =>
  document.getElementById(ID.mapPrintManagerButton);

export {
  topMenuContainerHTML,
  stationManagerTabHTML,
  lineManagerTabHTML,
  sectionManagerTabHTML,
  mapPrintManagerTabHTML,
  app,
  stationManagerTab,
  lineManagerTab,
  sectionManagerTab,
  mapPrintManagerTab,
  stationManagerButton,
  lineManagerButton,
  sectionManagerButton,
  mapPrintManagerButton,
};
