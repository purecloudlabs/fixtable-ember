import Ember from 'ember';

const possiblePageSizes = [ 25, 50, 100, 250, 500 ];
const defaultPage = 1;
const defaultPageSize = 25;
const toCompareString = x => x === null || typeof x === 'undefined' ? '' : x + '';

export default Ember.Component.extend({
  fixtable: null,
  columnsByKey: null,

  // paging
  clientPaging: false,
  serverPaging: false,
  totalRowsOnServer: 0, // only used for server paging

  // filters
  filters: null,
  filterToApply: null,
  filterDebounce: 500,
  realtimeFiltering: true,
  filtersAreActive: false,
  filtersAreDirty: false,

  // sorting
  sortBy: null,
  sortAscending: true,

  // row selection
  rowSelection: false,
  selectedRows: null, // maps row indices to selected state
  suppressSelectToggle: false,

  showManualFilterButtons: Ember.computed('realtimeFiltering', 'filters',
    function fixtableGrid$showManualFilterButtons() {
      return !this.get('realtimeFiltering') && Object.keys(this.get('filters')).length;
    }),

  onFilterChanged: function fixtableGrid$onFilterChanged(/*filters, columnKey*/) {
    this.set('filtersAreDirty', true);
    if (this.get('realtimeFiltering'))
    {
      Ember.run.debounce(this, this.applyFilter, this.get('filterDebounce'));
    }
  },

  applyFilter: function fixtableGrid$applyFilter() {
    // update the filterToApply property to trigger a change in sortedFilteredContent
    var filters = this.get('filters');
    this.set('filterToApply', JSON.parse(JSON.stringify(filters)));
    this.set('currentPage', 1);
    this.set('filtersAreDirty', false);

    var filtersAreActive = Object.keys(filters).some(key => !!filters[key]);
    this.set('filtersAreActive', filtersAreActive);

    Ember.run.once(this, this.notifyReloadContent);
  },

  clearFilter: function fixtableGrid$clearFilter() {
    // clear all the bound filter values and re-apply
    var filters = this.get('filters');
    Object.keys(filters).forEach(key => filters.set(key, ''));
    this.applyFilter();
  },

  currentPage: defaultPage,
  afterCurrentPageChanged: Ember.observer('currentPage', function fixtableGrid$afterCurrentPageChanged() {
    Ember.run.once(this, this.notifyReloadContent);
  }),

  pageSize: defaultPageSize,
  afterPageSizeChanged: Ember.observer('pageSize', function fixtableGrid$afterPageSizeChanged() {
    Ember.run.once(this, this.notifyReloadContent);
    this.set('currentPage', defaultPage);
  }),

  notifyReloadContent: function fixtableGrid$notifyReloadContent() {
    var handler = this.get('onReloadContent');
    if (typeof handler !== 'function') { return; }

    var sortBy = this.get('sortBy');
    var sortInfo = sortBy ? { key: sortBy, ascending: this.get('sortAscending') } : null;

    handler(
      this.get('currentPage'),
      this.get('pageSize'),
      this.get('filterToApply') || {},
      sortInfo);
  },

  pageSizeOptions: Ember.computed('totalRows', function fixtableGrid$pageSizeOptions() {
    // limit the page size options based on content size
    for (var i = 0; i < possiblePageSizes.length; i++) {
      if (possiblePageSizes[i] >= this.get('totalRows')) {
        break;
      }
    }
    return possiblePageSizes.slice(0, i + 1);
  }),

  showPaging: Ember.computed('clientPaging', 'serverPaging', function fixtableGrid$showPaging() {
    return this.get('clientPaging') || this.get('serverPaging');
  }),

  afterSortChanged: Ember.observer('sortBy', 'sortAscending', function fixtableGrid$afterSortChanged() {
    this.set('currentPage', defaultPage);
    Ember.run.once(this, this.notifyReloadContent);
  }),

  sortedContent: Ember.computed('content.[]', 'serverPaging', 'sortBy', 'sortAscending',
    function fixtableGrid$sortedContent() {
      var content = this.get('content') || [];
      var sortBy = this.get('sortBy');

      // don't sort on the client if server pagination is on, or if no sort specified
      if (this.get('serverPaging') || !sortBy) {
        return content;
      }

      var customSort = this.get('columnsByKey')[sortBy].sortFunction;
      var sortFunction;
      if (typeof customSort === 'function') {
        sortFunction = (leftRow, rightRow) => {
          var leftVal = leftRow[sortBy];
          var rightVal = rightRow[sortBy];
          return this.get('sortAscending') ? customSort(leftVal, rightVal) : customSort(rightVal, leftVal);
        };
      }
      else {
        sortFunction = (leftRow, rightRow) => {
          var leftVal = toCompareString(leftRow[sortBy]);
          var rightVal = toCompareString(rightRow[sortBy]);
          return this.get('sortAscending') ? leftVal.localeCompare(rightVal) : rightVal.localeCompare(leftVal);
        };
      }

      var sortedContent = content.slice(); // don't mutate the original collection
      sortedContent.sort(sortFunction);

      return sortedContent;
    }),

  sortedFilteredContent: Ember.computed('sortedContent', 'filterToApply', 'serverPaging',
    function fixtableGrid$sortedFilteredContent() {
      var sortedContent = this.get('sortedContent') || [];

      if (this.get('serverPaging')) {
        return sortedContent; // don't filter on the client if server pagination is on
      }

      var columnsByKey = this.get('columnsByKey');

      // client filtering
      var filters = this.get('filterToApply') || {};
      var sortedFilteredContent = sortedContent.filter(function(row) {
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

      return sortedFilteredContent;
    }),

  visibleContent: Ember.computed('sortedFilteredContent', 'currentPage', 'pageSize', 'clientPaging',
    function fixtableGrid$visibleContent() {
      var sortedFilteredContent = this.get('sortedFilteredContent') || [];

      if (!this.get('clientPaging')) {
        return sortedFilteredContent; // don't paginate on the client unless client pagination is on
      }

      var currentPage = this.get('currentPage');
      var pageSize = this.get('pageSize');
      return sortedFilteredContent.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }),

  totalRows: Ember.computed('sortedFilteredContent.[]', 'serverPaging', 'totalRowsOnServer',
    function fixtableGrid$totalRows() {
      if (this.get('serverPaging'))
      {
        return this.get('totalRowsOnServer');
      }
      else {
        var sortedFilteredContent = this.get('sortedFilteredContent');
        return sortedFilteredContent ? sortedFilteredContent.length : 0;
      }
    }),

  totalPages: Ember.computed('totalRows', 'pageSize', function fixtableGrid$totalPages() {
    return Math.ceil(this.get('totalRows') / this.get('pageSize'));
  }),

  validatePageNumberRange(unvalidated) {
    return Math.min(Math.max(1, unvalidated), this.get('totalPages'));
  },

  resetSelection: Ember.observer('visibleContent.[]', function fixtableGrid$resetSelection() {
    var selectedRows = Ember.Object.create();
    this.set('selectedRows', selectedRows);
    this.get('visibleContent').forEach((row, rowIndex) => {
      selectedRows.set(rowIndex.toString(), false);
    });

    var selectionKeys = Object.keys(selectedRows);
    var self = this;
    selectionKeys.forEach(function(key) {
      if (!selectedRows.hasObserverFor(key)) {
        selectedRows.addObserver(key, self, 'onSelectionChanged');
      }
    });

    this.setSelectAllToggleChecked(false);
    this.setSelectAllToggleIndeterminate(false);
  }),

  setSelectAllToggleChecked(value) {
    this.set('suppressSelectToggle', true);
    this.set('selectAllToggle', value);
    this.set('suppressSelectToggle', false);
  },

  setSelectAllToggleIndeterminate(indeterminate) {
    var selector = '.fixtable-column-headers th .fixtable-checkbox input[type=checkbox]';
    var element = this.get('element');
    if (element) {
      var checkbox = element.querySelector(selector);
      checkbox.indeterminate = indeterminate;
    }
  },

  onSelectionChanged(selectedRows/*, rowIndex*/) {
    var selectedRowKeys = Object.keys(selectedRows);
    var numSelected = selectedRowKeys.filter(key => selectedRows[key]).length;

    var allRowsAreSelected = numSelected === this.get('visibleContent').length;
    var someRowsAreSelected = numSelected > 0;

    if (allRowsAreSelected) {
      this.setSelectAllToggleChecked(true);
      this.setSelectAllToggleIndeterminate(false);
    }
    else if (someRowsAreSelected) {
      this.setSelectAllToggleChecked(false);
      this.setSelectAllToggleIndeterminate(true);
    }
    else {
      this.setSelectAllToggleChecked(false);
      this.setSelectAllToggleIndeterminate(false);
    }
  },

  toggleSelectAll: Ember.observer('selectAllToggle', function fixtableGrid$toggleSelectAll() {
    if (this.get('suppressSelectToggle')) {
      return; // this indicates that we're programmatically setting the property, not responding to user input
    }

    var selectedRows = this.get('selectedRows');
    var selectedRowKeys = Object.keys(selectedRows);
    var numSelected = selectedRowKeys.filter(rowIndex => selectedRows[rowIndex]).length;
    var allRowsAreSelected = numSelected === this.get('visibleContent').length;

    if (allRowsAreSelected) {
      selectedRowKeys.forEach(rowIndex => selectedRows.set(rowIndex, false));
    }
    else {
      selectedRowKeys.forEach(rowIndex => selectedRows.set(rowIndex, true));
    }
    this.setSelectAllToggleIndeterminate(false); // if the user clicked, it's not indeterminate
  }),

  actions: {
    goToPreviousPage() {
      this.set('currentPage', this.validatePageNumberRange(this.get('currentPage') - 1));
    },
    goToNextPage() {
      this.set('currentPage', this.validatePageNumberRange(this.get('currentPage') + 1));
    },

    applyManualFilter() {
      this.applyFilter();
    },
    clearManualFilter() {
      this.clearFilter();
    },

    sortColumn(columnKey) {
      if (this.get('sortBy') === columnKey) {
        this.set('sortAscending', !this.get('sortAscending'));
      }
      else {
        this.set('sortBy', columnKey);
        this.set('sortAscending', true);
      }
    }
  },

  init() {
    this._super(...arguments);

    var columnsByKey = {};
    this.get('columns').forEach(column => {
      columnsByKey[column.key] = column;
    });
    this.set('columnsByKey', columnsByKey);

    this.updateFilterObservers();
    this.resetSelection();
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
