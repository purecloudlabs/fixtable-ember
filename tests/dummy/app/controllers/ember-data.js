import Ember from 'ember';

export default Ember.Controller.extend({

  store: Ember.inject.service(),

  columnDefs: [
    {
      key: 'id',
      header: 'ID',
      width: 50,
      hideLabel: true
    },
    {
      key: 'name',
      header: 'Name',
      width: 200,
      cellClass: 'name',
      filter: {
        type: 'search'
      }
    },
    {
      key: 'address',
      header: 'Address',
      filter: {
        type: 'search'
      }
    },
    {
      key: 'alignment',
      header: 'Alignment',
      filter: {
        type: 'select',
        selectOptions: [
          { value: 'Good' },
          { value: 'Evil' },
          { value: 'Neutral' }
        ]
      }
    },
    {
      key: 'username',
      header: 'Username',
      component: 'user-name',
      cellClass: 'monospace'
    }
  ],

  possiblePageSizes: [5, 25, 50, 100],

  selectedNames: null,

  actions: {
    updatePage(page, pageSize, filters) {
      this.set('isLoading', true);
      let query = {
        pageNumber: page,
        pageSize: pageSize,
        name: filters.name || '',
        address: filters.address || '',
        alignment: filters.alignment || ''
      };
      this.get('store').query('character', query)
      .then( (data) => {
        let meta = data.meta;
        delete data.meta;
        this.setProperties({isLoading: false, model: data, meta: meta});
      });
    },
    updateSelection(selectedDataRows) {
      var selectedNames = selectedDataRows.map(row => row.get('name'));
      this.set('selectedNames', selectedNames.join(', '));
    }
  }

});
