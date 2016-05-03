import Ember from 'ember';

export default Ember.Component.extend({
  fixtable: null,

  didInsertElement() {
    // initialize the Fixtable script
    this._super(...arguments);
    this.set('fixtable', new Fixtable(this.$('.fixtable')[0]));
  },

  didRender() {
    // force the Fixtable to resize itself
    this._super(...arguments);
    this.get('fixtable').setDimensions();
  }
});
