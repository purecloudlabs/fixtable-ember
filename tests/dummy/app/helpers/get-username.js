import { helper as buildHelper } from '@ember/component/helper';

export function getUserName([id, name]/*, hash*/) {
  var regex = /\b(\w)+\b/;
  var regexResults = regex.exec(name);

  return regexResults[0].toLowerCase() + id;
}

export default buildHelper(getUserName);
