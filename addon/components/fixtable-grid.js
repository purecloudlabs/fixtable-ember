import Ember from 'ember';

const possiblePageSizes = [ 25, 50, 100, 250, 500 ];
const defaultPage = 1;
const defaultPageSize = 25;

export default Ember.Component.extend({
  fixtable: null,
  clientPaging: false,
  serverPaging: false,
  totalRowsOnServer: 0, // only used for server paging
  filters: null,
  filterDebounce: 500,

  onColumnsChanged: Ember.observer('columns.@each',
    function fixtableGrid$onColumnsChanged() {
      this.updateFilterObservers();
    }),

  updateFilterObservers() {
    var filters = Ember.Object.create();
    this.set('filters', filters);

    this.get('columns').forEach(colDef => {
      if (colDef.filter && typeof filters[colDef.key] === 'undefined') {
        filters[colDef.key] = "";
      }
    });

    var filterKeys = Object.keys(filters);
    var self = this;
    filterKeys.forEach(function(key) {
      if (!filters.hasObserverFor(key)) {
        filters.addObserver(key, self, 'onFilterChanged');
      }
    });
  },

  onFilterChanged: function fixtableGrid$onFilterChanged(filters, columnKey) {
    Ember.run.debounce(this, this.applyFilter, this.get('filterDebounce'));
  },

  applyFilter: function fixtableGrid$applyFilter() {
    console.log('time to apply filters!');
  },

  currentPage: defaultPage,
  afterCurrentPageChanged: Ember.observer('currentPage',
    function fixtableGrid$afterCurrentPageChanged() {
      Ember.run.once(this, this.notifyPageChanged);
    }),

  pageSize: defaultPageSize,
  afterPageSizeChanged: Ember.observer('pageSize',
    function fixtableGrid$afterPageSizeChanged() {
      Ember.run.once(this, this.notifyPageChanged);
      this.set('currentPage', defaultPage);
    }),

  notifyPageChanged: function fixtableGrid$notifyPageChanged() {
    var handler = this.get('onPageChanged');
    if (typeof handler === 'function') {
      handler(this.get('currentPage'), this.get('pageSize'));
    }
  },

  pageSizeOptions: Ember.computed('totalRows',
    function fixtableGrid$pageSizeOptions() {
      // limit the page size options based on content size
      for (var i = 0; i < possiblePageSizes.length; i++) {
        if (possiblePageSizes[i] >= this.get('totalRows')) {
          break;
        }
      }
      return possiblePageSizes.slice(0, i + 1);
    }),

  showPaging: Ember.computed('clientPaging', 'serverPaging',
    function fixtableGrid$showPaging() {
      return this.get('clientPaging') || this.get('serverPaging');
    }),

  visibleContent: Ember.computed('content.[]', 'currentPage', 'pageSize', 'clientPaging',
    function fixtableGrid$visibleContent() {
      var content = this.get('content') || [];

      if (!this.get('clientPaging')) {
        return content; // render everything if no pagination or server pagination
      }

      var currentPage = this.get('currentPage');
      var pageSize = this.get('pageSize');
      return content.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }),

  totalRows: Ember.computed('content.[]', 'serverPaging', 'totalRowsOnServer',
    function fixtableGrid$totalRows() {
      if (this.get('serverPaging'))
      {
        return this.get('totalRowsOnServer');
      }
      else {
        var content = this.get('content');
        return content ? content.length : 0;
      }
    }),

  totalPages: Ember.computed('totalRows', 'pageSize',
    function fixtableGrid$totalPages() {
      return Math.ceil(this.get('totalRows') / this.get('pageSize'));
    }),

  actions: {
    goToPreviousPage() {
      this.set('currentPage', Math.max(1, this.get('currentPage') - 1));
    },

    goToNextPage() {
      this.set('currentPage', Math.min(this.get('totalPages'), this.get('currentPage') + 1));
    }
  },

  init() {
    this._super(...arguments);
    this.updateFilterObservers();
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
