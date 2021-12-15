export default class SubwayView {
  constructor(model) {
    this.model = model;
    this.$app = document.getElementById('app');
  }

  renderInApp(position, html) {
    this.$app.insertAdjacentHTML(position, html);
  }
}
