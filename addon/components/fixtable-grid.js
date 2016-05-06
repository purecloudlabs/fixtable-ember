import Ember from 'ember';

const possiblePageSizes = [ 25, 50, 100, 250, 500 ];
const defaultPage = 1;
const defaultPageSize = 25;

export default Ember.Component.extend({
  fixtable: null,
  columnsByKey: null,
  clientPaging: false,
  serverPaging: false,
  totalRowsOnServer: 0, // only used for server paging
  filters: null,
  filterToApply: null,
  filterDebounce: 500,

  onFilterChanged: function fixtableGrid$onFilterChanged(/*filters, columnKey*/) {
    Ember.run.debounce(this, this.applyFilter, this.get('filterDebounce'));
  },

  applyFilter: function fixtableGrid$applyFilter() {
    // update the filterToApply property to trigger a change in filteredContent
    this.set('filterToApply', JSON.parse(JSON.stringify(this.get('filters'))));
    this.set('currentPage', 1);
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

  filteredContent: Ember.computed('content.[]', 'filterToApply', 'serverPaging',
    function fixtableGrid$filteredContent() {
      var content = this.get('content') || [];

      if (this.get('serverPaging')) {
        return content; // don't filter on the client if server pagination is on
      }

      var columnsByKey = this.get('columnsByKey');

      // client filtering
      var filters = this.get('filterToApply') || {};
      var filteredContent = content.filter(function(row) {
        return Object.keys(filters).every(function(columnKey) {
          if (!filters[columnKey]) { return true; } // no filter
          var cellData = (row[columnKey] || '').toLowerCase();
          var filterValue = filters[columnKey].toLowerCase();

          if (columnsByKey[columnKey].filter.type === 'select') {
            return cellData === filterValue;
          }
          else {
            return cellData.includes(filterValue);
          }
        });
      });

      return filteredContent;
    }),

  visibleContent: Ember.computed('filteredContent', 'currentPage', 'pageSize', 'clientPaging', 'serverPaging',
    function fixtableGrid$visibleContent() {
      var filteredContent = this.get('filteredContent') || [];

      if (!this.get('clientPaging')) {
        return filteredContent; // don't paginate on the client unless client pagination is on
      }

      var currentPage = this.get('currentPage');
      var pageSize = this.get('pageSize');
      return filteredContent.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }),

  totalRows: Ember.computed('filteredContent.[]', 'serverPaging', 'totalRowsOnServer',
    function fixtableGrid$totalRows() {
      if (this.get('serverPaging'))
      {
        return this.get('totalRowsOnServer');
      }
      else {
        var filteredContent = this.get('filteredContent');
        return filteredContent ? filteredContent.length : 0;
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

    var columnsByKey = {};
    this.get('columns').forEach(column => {
      columnsByKey[column.key] = column;
    });
    this.set('columnsByKey', columnsByKey);
  },

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
