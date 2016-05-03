import Ember from 'ember';

export function getProp([obj, propName]/*, hash*/) {
  // handle nested properties using dot notation
  var result = propName.split('.').reduce((currentObj, propKey) => {
    return currentObj ? currentObj[propKey] : null;
  }, obj);

  // standardize undefined to null
  return typeof result !== 'undefined' ? result : null;
}

export default Ember.Helper.helper(getProp);
