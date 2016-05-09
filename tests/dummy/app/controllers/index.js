import Ember from 'ember';

export default Ember.Controller.extend({
  noPageIsLoading: false,
  clientPageIsLoading: false,
  serverPageIsLoading: false,
  manualFilterPageIsLoading: false,

  actions: {
    toggle(propertyName) {
      this.set(propertyName, !this.get(propertyName));
    },

    updatePage(page, pageSize, filters, loadingProp, filteredContent, pagedContent) {
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

        // paginate
        this.set(filteredContent, filteredRows);
        filteredRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

        this.set(pagedContent, filteredRows);
      }, 500);
    },

    updateManualFilterPage(page, pageSize, filters) {
      this.actions.updatePage.call(this, page, pageSize, filters,
        'manualFilterPageIsLoading', 'model.manualFilterDataRows', 'model.manualFilterVisibleRows');
    },

    updateServerPage(page, pageSize, filters) {
      this.actions.updatePage.call(this, page, pageSize, filters,
        'serverPageIsLoading', 'model.filteredDataRows', 'model.pagedDataRows');
    }
  }
});
