import Component from '@ember/component';
import layout from '../templates/components/fixtable-footer';

export default Component.extend({
  layout,
  currentPage: null,
  totalPages: null,
  pageSize: null,
  pageSizeOptions: null,

  actions: {
    goToPreviousPage() {
      this.sendAction("goToPreviousPage");
    },
    goToNextPage() {
      this.sendAction("goToNextPage");
    }
  }
});
