import * as $ from './util/dom.js';
import { ID, CLASS } from './util/constants.js';

export default class SubwayController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  app() {
    this.view.renderInApp('beforeend', $.topMenuContainer);
    this.view.renderInApp('beforeend', $.stationManagerTab);
    this.view.renderInApp('beforeend', $.lineManagerTab);
    this.view.renderInApp('beforeend', $.sectionManagerTab);
    this.view.renderInApp('beforeend', $.mapPrintManagerTab);
  }
}
