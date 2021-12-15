import SubwayController from './controller.js';
import SubwayView from './view.js';
import SubwayModel from './model.js';
import * as elements from './util/elements.js';

window.addEventListener('DOMContentLoaded', () => {
  const model = new SubwayModel();
  const view = new SubwayView(model, elements);
  const controller = new SubwayController(model, view);
  controller.app();
});
