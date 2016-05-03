import Ember from 'ember';

export default Ember.Component.extend({
  fixtable: null,

  didInsertElement() {
    this._super(...arguments);

    // initialize the Fixtable script
    var fixtable = new Fixtable(this.$('.fixtable')[0]);

    // set fixtable column widths
    var columns = this.get('columns');
    columns.forEach((col, index) => {
      if (col.width) {
        fixtable.setColumnWidth(index + 1, col.width);
      }
    });

    this.set('fixtable', fixtable);
  },

  didRender() {
    // force the Fixtable to resize itself when rendered
    this._super(...arguments);
    this.get('fixtable').setDimensions();
  }
});
