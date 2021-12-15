import SubwayController from './controller.js';
import SubwayView from './view.js';
import SubwayModel from './model.js';

window.addEventListener('DOMContentLoaded', () => {
  const model = new SubwayModel();
  const view = new SubwayView(model);
  const controller = new SubwayController(model, view);
  controller.app();
});
