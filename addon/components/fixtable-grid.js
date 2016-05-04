import Ember from 'ember';

const possiblePageSizes = [ 25, 50, 100, 250, 500 ];
const defaultPage = 1;
const defaultPageSize = 25;

export default Ember.Component.extend({
  fixtable: null,
  currentPage: defaultPage, // TODO - notify consumer when currentPage changes

  pageSize: defaultPageSize, // TODO - notify consumer when pageSize changes
  resetCurrentPage: Ember.observer('pageSize', function() {
    this.set('currentPage', defaultPage);
  }),

  pageSizeOptions: Ember.computed('content.[]', function() {
    for (var i = 0; i < possiblePageSizes.length; i++) {
      if (possiblePageSizes[i] >= this.get('content').length) {
        break;
      }
    }
    return possiblePageSizes.slice(0, i + 1);
  }),

  totalPages: Ember.computed('content.[]', 'pageSize', function() {
    var contentLength = this.get('content').length;
    var pageSize = this.get('pageSize');

    return Math.ceil(contentLength / pageSize);
  }),

  actions: {
    goToPreviousPage() {
      this.set('currentPage', Math.max(1, this.get('currentPage') - 1));
    },

    goToNextPage() {
      this.set('currentPage', Math.min(this.get('totalPages'), this.get('currentPage') + 1));
    }
  },

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
