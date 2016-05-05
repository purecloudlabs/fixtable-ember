import Ember from 'ember';

export default Ember.Controller.extend({
  noPageIsLoading: false,
  clientPageIsLoading: false,
  serverPageIsLoading: false,

  actions: {
    toggle(propertyName) {
      this.set(propertyName, !this.get(propertyName));
    },

    updatePage(page, pageSize) {
      this.set('serverPageIsLoading', true);
      Ember.run.later(this, () => {
        this.set('serverPageIsLoading', false);
        this.set('model.pagedDataRows',
          this.get('model.dataRows').slice((page - 1) * pageSize, page * pageSize));
      }, 500);
    },
  }
});
