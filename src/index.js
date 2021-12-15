import SubwayController from './controller.js';
import SubwayView from './view.js';
import SubwayModel from './model.js';
import { CLASS } from './util/constants.js';
import * as elements from './util/elements.js';

// const elements = {
//   app: document.querySelector('#app'),
//   stationManagerTab: document.querySelector(`.${CLASS.stationManagerTab}`),
//   lineManagerTab: document.querySelector(`.${CLASS.lineManagerTab}`),
//   sectionManagerTab: document.querySelector(`.${CLASS.sectionManagerTab}`),
//   mapPrintManagerTab: document.querySelector(`.${CLASS.mapPrintManagerTab}`),
// };

window.addEventListener('DOMContentLoaded', () => {
  const model = new SubwayModel();
  const view = new SubwayView(model, elements);
  const controller = new SubwayController(model, view);
  controller.app();
});
