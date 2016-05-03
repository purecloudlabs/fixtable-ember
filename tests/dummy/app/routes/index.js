import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      columnDefs: [
        { key: 'name' },
        { key: 'address' }
      ],
      dataRows: [
        { name: 'Sherlock Holmes ', address: '221B Baker Street' },
        { name: 'Dudley Dursley', address: '4 Privet Drive' },
        { name: 'Hank Hill', address: '84 Rainey Street' },
        { name: 'Gandalf Stormcrow' }
      ]
    };
  }
});
