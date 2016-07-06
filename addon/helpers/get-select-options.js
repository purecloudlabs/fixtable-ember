import Ember from 'ember';

export function getSelectOptions([column, dataRows, serverPaging]/*, hash*/) {
  if (!column || !column.filter || column.filter.type !== 'select') {
    throw 'Cannot call getSelectOptions on a column without a select-type filter';
  }

  if (column.filter.automaticOptions) {
    if (serverPaging) {
      throw `Cannot use automaticOptions for select-type filter on column ${column.key} while serverPaging is turned on`;
    }

    let optionSet = new Set();
    dataRows.forEach(row => {
      optionSet.add(row[column.key]);
    });

    let selectOptions = [];
    for (let opt of optionSet) {
      selectOptions.push({ value: opt });
    }
    return selectOptions;
  }

  if (!column.filter.selectOptions) {
    throw `Select options must be specified for filter in column ${column.key}`;
  }
  return column.filter.selectOptions;
}

export default Ember.Helper.helper(getSelectOptions);
