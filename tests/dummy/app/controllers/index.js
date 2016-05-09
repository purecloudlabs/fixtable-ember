import Ember from 'ember';

export default Ember.Controller.extend({
  noPageIsLoading: false,
  clientPageIsLoading: false,
  serverPageIsLoading: false,
  manualFilterPageIsLoading: false,

  noPageSortKey: 'id',
  clientPageSortKey: 'id',
  serverPageSortKey: 'id',
  manualFilterPageSortKey: 'id',

  actions: {
    toggle(propertyName) {
      this.set(propertyName, !this.get(propertyName));
    },

    updatePage(page, pageSize, filters, sortInfo, loadingProp, filteredContent, pagedContent) {
      console.log('Reloading content:');
      console.log(`\tPage: ${page}`);
      console.log(`\tPage Size: ${pageSize}`);
      console.log('Sort Info:');
      console.dir(sortInfo);
      console.log('Filters:');
      console.dir(filters);
      console.log('\n');

      this.set(loadingProp, true);

      // simulate server-side filtering and pagination
      Ember.run.later(this, () => {
        this.set(loadingProp, false);

        // apply filters
        var columnsByKey = {};
        this.get('model.filteredColumnDefs').forEach(column => {
          columnsByKey[column.key] = column;
        });
        var dataRows = this.get('model.dataRows');
        var filteredRows = dataRows.filter(function(row) {
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

        if (sortInfo && sortInfo.key) {
          if (sortInfo.key === 'id') {
            // do a numeric sort for ID
            filteredRows.sort((x, y) => {
              return sortInfo.ascending ? x.id - y.id : y.id - x.id;
            });
          }
          else {
            // do a lexicographical sort for everything other than ID
            filteredRows.sort((x, y) => {
              var xVal = x[sortInfo.key] || '';
              var yVal = y[sortInfo.key] || '';
              return sortInfo.ascending ? xVal.localeCompare(yVal) : yVal.localeCompare(xVal);
            });
          }
        }

        // paginate
        this.set(filteredContent, filteredRows);
        filteredRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

        this.set(pagedContent, filteredRows);
      }, 500);
    },

    updateManualFilterPage(page, pageSize, filters, sortInfo) {
      this.actions.updatePage.call(this, page, pageSize, filters, sortInfo,
        'manualFilterPageIsLoading', 'model.manualFilterDataRows', 'model.manualFilterVisibleRows');
    },

    updateServerPage(page, pageSize, filters, sortInfo) {
      this.actions.updatePage.call(this, page, pageSize, filters, sortInfo,
        'serverPageIsLoading', 'model.filteredDataRows', 'model.pagedDataRows');
    }
  }
});
