import ArrayProxy from '@ember/array/proxy';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  data: service(),

  model() {
    return {
      dataRows: ArrayProxy.create({
        content: this.get('data').getObservableData()
      })
    };
  }
});
