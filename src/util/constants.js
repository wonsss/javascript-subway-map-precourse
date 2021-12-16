const ID = Object.freeze({
  stationManagerButton: 'station-manager-button',
  lineManagerButton: 'line-manager-button',
  sectionManagerButton: 'section-manager-button',
  mapPrintManagerButton: 'map-print-manager-button',
  stationNameInput: 'station-name-input',
  stationAddButton: 'station-add-button',
  lineNameInput: 'line-name-input',
  lineStartStationSelector: 'line-start-station-selector',
  lineEndStationSelector: 'line-end-station-selector',
  lineAddButton: 'line-add-button',
  sectionStationSelector: 'section-station-selector',
  sectionOrderInput: 'section-order-input',
  sectionAddButton: 'section-add-button',
  app: 'app',
  stationTable: 'station-table',
  lineTable: 'line-table',
  lineListButtons: 'line-list-buttons',
  sectionTable: 'section-table',
});

const CLASS = Object.freeze({
  stationDeleteButton: 'station-delete-button',
  lineDeleteButton: 'line-delete-button',
  sectionLineMenuButton: 'section-line-menu-button',
  sectionDeleteButton: 'section-delete-button',
  stationManagerTab: 'station-manager-tab',
  lineManagerTab: 'line-manager-tab',
  sectionManagerTab: 'section-manager-tab',
  mapPrintManagerTab: 'map-print-manager-tab',
  show: 'show',
  eachSection: 'each-section',
  map: 'map',
});

const KEY = Object.freeze({
  station: 'station',
  line: 'line',
});

const MESSAGE = Object.freeze({
  confirmOfDelete: '정말로 삭제하시겠습니까?',
  alertOfUnderTwoStation:
    '노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없습니다.',
  alertOfShortStationName: '지하철 역은 2글자 이상이어야 합니다.',
  alertOfShortLineName: '노선 이름은 2글자 이상이어야 합니다.',
  alertOfStationNameThatAlreadyExists:
    '중복된 지하철 역 이름은 등록될 수 없습니다.',
  alertOfLineNameThatAlreadyExists:
    '중복된 지하철 노선 이름은 등록될 수 없습니다.',
  alertOfCannotDeleteStationRegistered:
    '노선에 등록된 역은 삭제할 수 없습니다.',
  alertOfSameEndpoints: '종점이 같을 수 없습니다.',
});

export { ID, CLASS, KEY, MESSAGE };
