import Ember from 'ember';

export function getUserName([id, name]/*, hash*/) {
  var regex = /\b(\w)+\b/;
  var regexResults = regex.exec(name);

  return regexResults[0].toLowerCase() + id;
}

export default Ember.Helper.helper(getUserName);
