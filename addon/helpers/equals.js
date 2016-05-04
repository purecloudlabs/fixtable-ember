import Ember from 'ember';

export function equals([left, right]/*, hash*/) {
  return left === right;
}

export default Ember.Helper.helper(equals);
