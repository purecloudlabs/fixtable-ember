import { helper as buildHelper } from '@ember/component/helper';

const isNullEmptyOrUndefined = val =>
  val === null || val === '' || typeof val === 'undefined';

export function equals([left, right]/*, hash*/) {
  if (isNullEmptyOrUndefined(left) && isNullEmptyOrUndefined(right)) {
    return true;
  }

  return left === right;
}

export default buildHelper(equals);
