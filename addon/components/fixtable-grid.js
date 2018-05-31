/* global Fixtable */

import DS from 'ember-data';
import Ember from 'ember';
import _ from 'lodash';
import layout from '../templates/components/fixtable-grid';

const checkboxColumnWidth = 40; // in pixels
const defaultPossiblePageSizes = [ 25, 50, 100, 250, 500 ];
const defaultPage = 1;
const defaultPageSize = 25;
const toComparableString = x => x === null || typeof x === 'undefined' ? '' : x + '';
const getCellData = (row, key) => row.get ? row.get(key) : row[key];

export default Ember.Component.extend({
  layout: layout,
  fixtable: null,
  columnsByKey: null,
  debugMode: false,

  // paging
  clientPaging: false,
  serverPaging: false,
  showPaging: Ember.computed.or('clientPaging', 'serverPaging'),
  totalRowsOnServer: 0, // only used for server paging
  showPaginationFooter: Ember.computed.and('showPaging', 'visibleContent.length'),

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
  selectedRowMap: null, // maps row indices to selected state
  suppressSelectToggle: false,

  // custom components
  emptyStateComponent: 'fixtable-empty-state',
  emptyStateComponentValues: {nullMessage: 'No data available'},
  footerComponent: 'fixtable-footer',

  // backwards-compatibility for old nullMessage option
  // TODO: remove this in fixtable-ember v4.0.0
  nullMessageChanged: Ember.observer('nullMessage', function () {
    Ember.Logger.warn('Deprecation warning: use emptyStateComponentValues instead of nullMessage. Support will be dropped in fixtable-ember v4.x. See https://github.com/MyPureCloud/fixtable-ember#empty-state-component for more info.');
    this.set('emptyStateComponentValues.nullMessage', this.get('nullMessage'));
  }),

  externalFilters: null,

  currentPage: defaultPage,
  afterCurrentPageChanged: Ember.observer('currentPage', function fixtableGrid$afterCurrentPageChanged() {
    let currentPage = this.get('currentPage'),
        totalPages = this.get('totalPages');

    if (currentPage < 1) {
      this.set('currentPage', 1);
    } else if (currentPage > totalPages) {
      this.set('currentPage', totalPages);
    }
    //Ember.run.once(this, this.notifyReloadContent);
    Ember.run.debounce(this, this.notifyReloadContent, 300, false);
  }),

  pageSize: defaultPageSize,
  possiblePageSizes: defaultPossiblePageSizes,
  afterPageSizeChanged: Ember.observer('pageSize', function fixtableGrid$afterPageSizeChanged() {
    Ember.run.once(this, this.notifyReloadContent);
    this.set('currentPage', defaultPage);
  }),

  notifyReloadContent() {
    let handler = this.get('onReloadContent');
    if (typeof handler === 'function') {
      let sortBy = this.get('sortBy');
      let sortInfo = sortBy ? { key: sortBy, ascending: this.get('sortAscending') } : null;

      handler(
        this.get('currentPage'),
        this.get('pageSize'),
        this.get('filterToApply') || {},
        sortInfo,
        this.get('externalFilters'));
    }

    // if we need to reload content, that also means the selection will be reset
    this.notifyRowSelectionChanged([]);
  },

  pageSizeOptions: Ember.computed('totalRows', function fixtableGrid$pageSizeOptions() {
    // limit the page size options based on content size
    let i = 0;
    let possiblePageSizes = this.get('possiblePageSizes');
    while (i < possiblePageSizes.length && possiblePageSizes[i] < this.get('totalRows')) {
      i++;
    }
    return possiblePageSizes.slice(0, i + 1);
  }),

  showManualFilterButtons: Ember.computed('realtimeFiltering', 'filters',
    function fixtableGrid$showManualFilterButtons() {
      return !this.get('realtimeFiltering') && Object.keys(this.get('filters')).length;
    }),

  onFilterChanged(/*filters, columnKey*/) {
    this.set('filtersAreDirty', true);
    if (this.get('realtimeFiltering')) {
      Ember.run.debounce(this, this.applyFilter, this.get('filterDebounce'));
    }
  },

  applyFilter() {
    // update the filterToApply property to trigger a change in sortedFilteredContent
    let filters = this.get('filters');
    this.set('filterToApply', JSON.parse(JSON.stringify(filters)));
    this.set('currentPage', 1);
    this.set('filtersAreDirty', false);

    let filtersAreActive = Object.keys(filters).some(key => !!filters[key]);
    this.set('filtersAreActive', filtersAreActive);

    Ember.run.once(this, this.notifyReloadContent);
  },

  clearFilter() {
    // clear all the bound filter values and re-apply
    let filters = this.get('filters');
    Object.keys(filters).forEach(key => filters.set(key, ''));
    this.applyFilter();
  },

  sortByColumn(columnKey) {
    if (this.get('sortBy') === columnKey) {
      this.set('sortAscending', !this.get('sortAscending'));
    }
    else {
      this.set('sortBy', columnKey);
      this.set('sortAscending', true);
    }
  },

  afterSortChanged: Ember.observer('sortBy', 'sortAscending', function fixtableGrid$afterSortChanged() {
    this.set('currentPage', defaultPage);
    Ember.run.once(this, this.notifyReloadContent);
  }),

  sortedContent: Ember.computed('content.[]', 'serverPaging', 'sortBy', 'sortAscending',
    function fixtableGrid$sortedContent() {
      let content = this.get('content') || [];
      let sortBy = this.get('sortBy');

      // don't sort on the client if server pagination is on, or if no sort specified
      if (this.get('serverPaging') || !sortBy) {
        return content;
      }

      let sortedContent = content.slice(); // don't mutate the original collection
      sortedContent.sort(this.getSortFunction(sortBy));

      return sortedContent;
    }),

  getSortFunction(sortBy) {
    let customSort = this.get('columnsByKey')[sortBy] && this.get('columnsByKey')[sortBy].sortFunction;

    if (typeof customSort === 'function') {
      // use the custom sort function
      return (leftRow, rightRow) => {
        let leftVal = getCellData(leftRow, sortBy);
        let rightVal = getCellData(rightRow, sortBy);
        return this.get('sortAscending') ? customSort(leftVal, rightVal) : customSort(rightVal, leftVal);
      };
    }
    else {
      // use lexicographical sorting if no custom sort function is specified
      return (leftRow, rightRow) => {
        let leftVal = toComparableString(getCellData(leftRow, sortBy));
        let rightVal = toComparableString(getCellData(rightRow, sortBy));
        return this.get('sortAscending') ? leftVal.localeCompare(rightVal) : rightVal.localeCompare(leftVal);
      };
    }
  },

  sortedFilteredContent: Ember.computed('sortedContent', 'filterToApply', 'serverPaging',
    function fixtableGrid$sortedFilteredContent() {
      let sortedContent = this.get('sortedContent') || [];

      if (this.get('serverPaging')) {
        return sortedContent; // don't filter on the client if server pagination is on
      }

      return this.getFilteredContent(sortedContent);
    }),

  getFilteredContent(content) {
    // client filtering
    let columnsByKey = this.get('columnsByKey');
    let filters = this.get('filterToApply') || {};
    let columnKeys = Object.keys(filters);

    return content.filter(row => {
      return columnKeys.every(columnKey => {
        let filterDef = columnsByKey[columnKey].filter;
        let filterFunction = filterDef.filterFunction;
        let filterValue = filters[columnKey];

        // custom filter
        if (typeof filterFunction === 'function') {
          return filterFunction(row, filterValue);
        }

        // no filter
        if (!filters[columnKey]) {
          return true;
        }

        // normalize the cell and filter values
        let cellData = (getCellData(row, columnKey) || '').toLowerCase();
        filterValue = filterValue.toLowerCase();

        // select-type filter
        if (columnsByKey[columnKey].filter.type === 'select') {
          return cellData === filterValue;
        }

        // search-type filter
        return cellData.includes(filterValue);
      });
    });
  },

  visibleContent: Ember.computed('sortedFilteredContent', 'currentPage', 'pageSize', 'clientPaging',
    function fixtableGrid$visibleContent() {
      let sortedFilteredContent = this.get('sortedFilteredContent');

      // ensure sortedFilteredContent is a supported type
      let allowedTypes = [Array, Ember.ArrayProxy, DS.ManyArray];
      let isAllowedType = allowedTypes.some(function (type) {
        return sortedFilteredContent instanceof type;
      });
      if (!isAllowedType) {
        Ember.Logger.warn('Content supplied to Fixtable is not a supported type');
        return [];
      }

      if (this.get('clientPaging')) {
        let currentPage = this.get('currentPage');
        let pageSize = this.get('pageSize');
        sortedFilteredContent = sortedFilteredContent.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      }

      return sortedFilteredContent.map(function (rowObject) {
          return {
              object: rowObject,
              hover: false,
              expanded: false
          };
      });
    }),

  totalColumns: Ember.computed('columns.[]', 'rowSelection', function fixtableGrid$totalColumns() {
    return this.get('columns').length + (this.get('rowSelection') ? 1 : 0);
  }),

  totalRows: Ember.computed('sortedFilteredContent.[]', 'serverPaging', 'totalRowsOnServer',
    function fixtableGrid$totalRows() {
      if (this.get('serverPaging')) {
        return this.get('totalRowsOnServer');
      }

      let sortedFilteredContent = this.get('sortedFilteredContent') || [];
      return sortedFilteredContent.length;
    }),

  totalPages: Ember.computed('totalRows', 'pageSize', function fixtableGrid$totalPages() {
    return Math.ceil(this.get('totalRows') / this.get('pageSize'));
  }),

  resetSelection: Ember.observer('visibleContent.[]', function fixtableGrid$resetSelection() {
    if (!this.get('rowSelection')) { return; }

    let selectedRowMap = Ember.Object.create();
    this.set('selectedRowMap', selectedRowMap);
    this.get('visibleContent').forEach((row, rowIndex) => {
      selectedRowMap.set(rowIndex.toString(), false);
    });

    let selectionKeys = Object.keys(selectedRowMap);
    let self = this;
    selectionKeys.forEach(key => {
      if (!selectedRowMap.hasObserverFor(key)) {
        selectedRowMap.addObserver(key, self, 'onRowSelectedOrDeselected');
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
    if (!this.get('rowSelection')) { return; }

    let selector = '.fixtable-column-headers th .fixtable-checkbox input[type=checkbox]';
    let element = this.get('element');
    if (element) {
      let checkbox = element.querySelector(selector);
      checkbox.indeterminate = indeterminate;
    }
  },

  onRowSelectedOrDeselected(selectedRowMap/*, rowIndex*/) {
    // selectedRowMap maps row indices in visibleContent to their selection status
    if (!this.get('rowSelection')) { return; }

    let selectedDataRows = Object.keys(selectedRowMap)
      .filter(index => selectedRowMap[index])
      .map(index => this.get('visibleContent')[index]);

    let numSelected = selectedDataRows.length;
    let allRowsAreSelected = numSelected === this.get('visibleContent').length;
    let someRowsAreSelected = numSelected > 0;

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

    this.notifyRowSelectionChanged(selectedDataRows);
  },

  notifyRowSelectionChanged(selectedDataRows) {
    this.set('selectedDataRows', selectedDataRows.map((row) => {
      return row.object;
    }));
    let handler = this.get('onSelectionChanged');
    if (typeof handler === 'function') {
      handler(this.get('selectedDataRows'));
    }
  },

  toggleSelectAll: Ember.observer('selectAllToggle', function fixtableGrid$toggleSelectAll() {
    if (this.get('suppressSelectToggle') || !this.get('rowSelection')) {
      return; // quit if we're programmatically setting the property, not responding to user input
    }

    let selectedRowMap = this.get('selectedRowMap');
    let selectedRowKeys = Object.keys(selectedRowMap);

    let numSelected = selectedRowKeys.filter(rowIndex => selectedRowMap[rowIndex]).length;
    let allRowsAreSelected = numSelected === this.get('visibleContent').length;

    // If all rows already selected, deselect all. Otherwise, select all.
    selectedRowKeys.forEach(rowIndex => selectedRowMap.set(rowIndex, !allRowsAreSelected));

    this.setSelectAllToggleIndeterminate(false); // if the user clicked, it's not indeterminate
  }),

  safeSetCurrentPage(newPage) {
    let validPageNum = Math.min(Math.max(1, newPage), this.get('totalPages'));
    this.set('currentPage', validPageNum);
  },

  actions: {
    goToPreviousPage() {
      let currentPage = parseInt(this.get('currentPage'));
      this.safeSetCurrentPage(currentPage - 1);
    },
    goToNextPage() {
      let currentPage = parseInt(this.get('currentPage'));
      this.safeSetCurrentPage(currentPage + 1);
    },

    applyManualFilter() {
      this.applyFilter();
    },
    clearManualFilter() {
      this.clearFilter();
    },

    sortColumn(columnKey) {
      this.sortByColumn(columnKey);
    },

    onRowClick(row) {
      var handler = this.get('onRowClick');
      if (typeof handler === 'function') {
        handler(row);
      }
    }
  },

  init() {
    this._super(...arguments);

    this.indexColumns();
    this.updateFilterObservers();
    this.resetSelection();
  },

  indexColumns() {
    let columnsByKey = {};
    this.get('columns').forEach(column => {
      columnsByKey[column.key] = column;
    });
    this.set('columnsByKey', columnsByKey);
  },

  updateFilterObservers() {
    let filters = Ember.Object.create();
    this.set('filters', filters);

    this.get('columns').forEach(colDef => {
      if (colDef.filter && typeof filters[colDef.key] === 'undefined') {
        filters[colDef.key] = "";
      }
    });

    let filterKeys = Object.keys(filters);
    let self = this;
    filterKeys.forEach(key => {
      if (!filters.hasObserverFor(key)) {
        filters.addObserver(key, self, 'onFilterChanged');
      }
    });
  },

  didInsertElement() {
    this._super(...arguments);
    Ember.run.later(this, this.initializeFixtable, 0);
  },

  initializeFixtable() {
    let fixtableElement = this.$('.fixtable') ? this.$('.fixtable')[0] : undefined; //codes around a bug in ember test where jquery can't find the fixtable element initially
    if (!fixtableElement) {
        return;
    }
    // initialize the Fixtable script
    let fixtable = new Fixtable(this.$('.fixtable')[0], this.get('debugMode'));

    // account for the row selection checkbox column, if present
    let indexOffset = 1;
    if (this.get('rowSelection')) {
      indexOffset++;
      fixtable.setColumnWidth(1, checkboxColumnWidth);
    }

    // set fixtable column widths
    this.get('columns').forEach((col, index) => {
      if (col.width) {
        fixtable.setColumnWidth(index + indexOffset, col.width);
      }
    });

    fixtable.setDimensions();
    this.set('fixtable', fixtable);
    this.notifyReloadContent();
  },

  didRender() {
    // force the Fixtable to resize itself when rendered
    this._super(...arguments);
    let fixtable = this.get('fixtable');
    if (fixtable) {
      fixtable.setDimensions();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    // trigger content reload when externalFilters change
    let oldExternalFilters = this.get('_previousExternalFilters');
    let newExternalFilters = _.cloneDeep(this.get('externalFilters'));
    if (oldExternalFilters && !_.isEqual(oldExternalFilters, newExternalFilters)) {
      this.set('currentPage', 1);
      Ember.run.debounce(this, this.notifyReloadContent, 300, false);
    }
    this.set('_previousExternalFilters', newExternalFilters);
  }
});
