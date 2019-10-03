import Component from '@ember/component';

export default Component.extend({
  actions: {
    purifyRow(dataRow) {
      this.bubbleAction('purifyRow', dataRow);
    }
  }
});
