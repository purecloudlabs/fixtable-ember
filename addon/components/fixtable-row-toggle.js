import Ember from 'ember';
import layout from '../templates/components/fixtable-row-toggle';

export default Ember.Component.extend({
  layout,
  classNames: ['fixtable-row-toggle'],
  click: function() {
    this.toggleProperty('rowExpanded');
  }
});
