import Ember from 'ember';

export default Ember.Controller.extend({
  dataIsLoading: false,

  actions: {
    toggleLoading() {
      this.set('dataIsLoading', !this.get('dataIsLoading'));
    }
  }
});
