import Ember from 'ember';
import layout from '../templates/components/fixtable-column-header';

export default Ember.Component.extend({
  layout,
  tagName: 'th',

  column: null,
  sortBy: null,
  sortAscending: null,

  actions: {
    sortColumn(columnKey) {
      this.sendAction('sortColumn', columnKey);
    }
  }
});
