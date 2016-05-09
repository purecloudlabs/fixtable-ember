import Ember from 'ember';

const isNullEmptyOrUndefined = val =>
  val === null || val === '' || typeof val === 'undefined';

export function equals([left, right]/*, hash*/) {
  if (isNullEmptyOrUndefined(left) && isNullEmptyOrUndefined(right)) {
    return true;
  }

  return left === right;
}

export default Ember.Helper.helper(equals);
