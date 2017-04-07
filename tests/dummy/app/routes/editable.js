import Ember from 'ember';

export default Ember.Route.extend({
  data: Ember.inject.service(),

  model() {
    return {
      dataRows: Ember.ArrayProxy.create({
        content: this.get('data').getObservableData()
      })
    };
  }
});
