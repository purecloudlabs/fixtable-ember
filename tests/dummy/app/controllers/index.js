import Ember from 'ember';

function toggleBooleanProperty(self, propertyName) {
  self.set(propertyName, !self.get(propertyName));
}

export default Ember.Controller.extend({
  dataIsLoading: false,

  actions: {
    toggleLoading() {
      toggleBooleanProperty(this, 'dataIsLoading');
    }
  }
});
