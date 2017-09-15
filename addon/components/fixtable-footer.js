import Ember from 'ember';
import layout from '../templates/components/fixtable-footer';

export default Ember.Component.extend({
  layout,
  classNames: ['fixtable-footer'],
  currentPage: null,
  totalPages: null,
  pageSize: null,
  pageSizeOptions: null,
  nextDisabled: Ember.computed('currentPage', 'totalPages', function() {
    let { currentPage, totalPages } = this.getProperties('currentPage', 'totalPages');
    return currentPage >= totalPages;
  }),

  actions: {
    goToPreviousPage() {
      this.sendAction("goToPreviousPage");
    },
    goToNextPage() {
      this.sendAction("goToNextPage");
    }
  }
});
