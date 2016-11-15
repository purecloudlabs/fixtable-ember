import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    purifyRow(dataRow) {
      this.bubbleAction('purifyRow', dataRow);
    }
  }
});
