import * as $ from './util/dom.js';
import { SELECTOR } from './util/constants.js';

export default class SubwayController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  app() {
    // this.view.renderInApp('afterbegin', $.);
  }
}
