import Ember from 'ember';

export default Ember.Route.extend({
  data: Ember.inject.service(),

  model() {
    var model = {
      columnDefs: [
        {
          key: 'id',
          header: 'ID',
          width: 50,
          sortable: true,
          hideLabel: true
        },
        {
          key: 'name',
          header: 'Name',
          width: 200,
          cellClass: 'name',
          sortable: true
        },
        {
          key: 'address',
          header: 'Address',
          sortable: true
        },
        {
          key: 'alignment',
          header: 'Alignment',
          sortable: true
        },
        {
          key: 'username',
          header: 'Username',
          component: 'user-name',
          cellClass: 'monospace'
        }
      ],
      dataRows: this.get('data').getRawData()
    };

    // server paging/filtering
    model.pagedDataRows = model.dataRows.slice(0, 25);
    model.filteredDataRows = model.dataRows;

    // server paging + manual filter application
    model.manualFilterDataRows = model.dataRows;
    model.manualFilterVisibleRows = model.dataRows.slice(0, 25);

    // create a version of the column defs that includes filters
    model.filteredColumnDefs = JSON.parse(JSON.stringify(model.columnDefs));
    model.filteredColumnDefs[1].filter = { // name
      type: 'search',
      placeholder: 'name'
    };
    model.filteredColumnDefs[2].filter = { // address
      type: 'search',
      placeholder: 'address'
    };
    model.filteredColumnDefs[3].filter = { // alignment
      type: 'select',
      selectOptions: [
        { value: 'Good', label: 'Positive' },
        { value: 'Evil', label: 'Negative' },
        { value: 'Neutral' }
      ],
      placeholder: 'All'
    };

    // create a version of the filtered column defs that includes automaticOptions
    model.clientColumnDefs = JSON.parse(JSON.stringify(model.filteredColumnDefs));
    model.clientColumnDefs[3].filter = { // alignment
      type: 'select',
      automaticOptions: true,
      placeholder: 'All'
    };

    // add a custom ID sorting function to both versions of the column defs
    var sortFunc = (x, y) => x - y;
    model.columnDefs[0].sortFunction = sortFunc;
    model.filteredColumnDefs[0].sortFunction = sortFunc;
    model.clientColumnDefs[0].sortFunction = sortFunc;

    return model;
  }
});
