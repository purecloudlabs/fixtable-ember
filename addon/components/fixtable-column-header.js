import Component from '@ember/component';
import layout from '../templates/components/fixtable-column-header';

export default Component.extend({
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
