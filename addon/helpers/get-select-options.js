import Ember from 'ember';

export function getSelectOptions([column, dataRows, serverPaging]/*, hash*/) {
  if (!column || !column.filter || column.filter.type !== 'select') {
    throw 'Cannot call getSelectOptions on a column without a select-type filter';
  }

  if (column.filter.automaticOptions) {
    if (serverPaging) {
      throw `Cannot use automaticOptions for select-type filter on column ${column.key} while serverPaging is turned on`;
    }

    let optionSet = {};
    dataRows.forEach(row => {
      let val = row[column.key];
      if (typeof val === 'undefined' || val === null || val === '') { return; }

      let lower = (val + '').toLowerCase();
      if (typeof optionSet[lower] !== 'undefined') { return; } // we already have this option
      optionSet[lower] = val;
    });

    return Object.keys(optionSet).map(opt => {
      return { value: optionSet[opt] };
    });
  }

  if (!column.filter.selectOptions) {
    throw `Select options must be specified for filter in column ${column.key}`;
  }
  return column.filter.selectOptions;
}

export default Ember.Helper.helper(getSelectOptions);
