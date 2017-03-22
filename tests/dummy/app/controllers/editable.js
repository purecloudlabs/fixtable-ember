/* global alert */
import Ember from 'ember';

export default Ember.Controller.extend({
  data: Ember.inject.service(),

  sortKey: 'id',
  selected: null, // object where keys are IDs of selected rows

  // properties for adding a new row
  newRowName: null,
  newRowAddress: null,
  newRowAlignment: null,

  // properties for editing an existing row
  idToEdit: null,
  editing: false,
  editRowName: null,
  editRowAddress: null,
  editRowAlignment: null,

  columnDefs: [
    {
      key: 'id',
      header: 'ID',
      width: 50,
      sortable: true,
      sortFunction: (x, y) => x - y
    },
    {
      key: 'name',
      header: 'Name',
      cellClass: 'name',
      sortable: true,
      filter: { type: 'search' }
    },
    {
      key: 'address',
      header: 'Address',
      sortable: true,
      filter: { type: 'search' }
    },
    {
      key: 'alignment',
      header: 'Alignment',
      sortable: true,
      filter: { type: 'select', automaticOptions: true }
    },
    {
      key: 'purify',
      header: 'Purify',
      component: 'purify-button',
      width: 100
    },
    {
      key: 'condemn',
      header: 'Condemn',
      component: 'condemn-button',
      width: 100
    }
  ],

  getEditRow() {
    let id = this.get('idToEdit');
    if (!id) {
      return null;
    }

    return this.get('model.dataRows').findBy('id', parseInt(id, 10));
  },

  actions: {
    addRow() {
      let dataRows = this.get('model.dataRows');
      let id = dataRows.get('lastObject.id');
      id = id ? id + 1 : 1; // increment ID, or start at 1

      let row = Ember.Object.create();
      row.set('id', id);
      row.set('name', this.get('newRowName'));
      row.set('address', this.get('newRowAddress'));
      row.set('alignment', this.get('newRowAlignment'));

      dataRows.pushObject(row);
    },

    deleteSelectedRows() {
      if (this.get('editing')) {
        alert('You should not delete rows while editing an existing row');
        return;
      }

      let dataRows = this.get('model.dataRows');
      let selected = this.get('selected') || {};
      for (var i = dataRows.get('length') - 1; i >= 0; i--) {
        let id = dataRows.objectAt(i).get('id');
        if (selected[id]) {
          dataRows.removeAt(i);
        }
      }

      this.set('selected', {});
    },

    editRow() {
      let row = this.getEditRow();
      if (!row) {
        return;
      }

      this.set('editRowName', row.get('name'));
      this.set('editRowAddress', row.get('address'));
      this.set('editRowAlignment', row.get('alignment'));
      this.set('editing', true);
    },

    saveEditedRow() {
      let row = this.getEditRow();
      if (!row) {
        return;
      }

      row.set('name', this.get('editRowName'));
      row.set('address', this.get('editRowAddress'));
      row.set('alignment', this.get('editRowAlignment'));
      this.set('editing', false);
    },

    resetData() {
      this.set('model.dataRows.content', this.get('data').getObservableData());
    },

    updateSelection(selectedDataRows) {
      let selected = {};
      selectedDataRows.forEach(row => {
        selected[row.id] = true;
      });
      this.set('selected', selected);
    },

    purifyRow(dataRow) {
      if (dataRow) {
        dataRow.set('alignment', 'Good');
      }
    },

    condemnRow(dataRow) {
      if (dataRow) {
        dataRow.set('alignment', 'Evil');
      }
    }
  }
});
