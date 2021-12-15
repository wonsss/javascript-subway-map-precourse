import { ID, CLASS } from './constants.js';

const topMenuContainer = `      
<div>
    <button id="${ID.sectionManagerButton}">1. 역 관리</button>
    <button id="${ID.lineManagerButton}">2. 노선 관리</button>
    <button id="${ID.sectionManagerButton}">3. 구간 관리</button>
    <button id="${ID.mapPrintManagerButton}">4. 지하철 노선도 출력</button>
</div>
`;

const stationManagerTab = `
<div id="${ID.stationManagerTab}">1</div>

`;

const lineManagerTab = `
<div id="${ID.lineManagerTab}">2</div>
`;

const sectionManagerTab = `
<div id="${ID.sectionManagerTab}">3</div>
`;

const mapPrintManagerTab = `
<div id="${ID.mapPrintManagerTab}">4</div>
`;

export {
  topMenuContainer,
  stationManagerTab,
  lineManagerTab,
  sectionManagerTab,
  mapPrintManagerTab,
};
