import Component from '@ember/component';
import layout from '../templates/components/fixtable-row-toggle';

export default Component.extend({
  layout,
  classNames: ['fixtable-row-toggle'],
  click: function() {
    this.toggleProperty('rowExpanded');
  }
});
