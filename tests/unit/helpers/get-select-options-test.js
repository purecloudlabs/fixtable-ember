import { getSelectOptions } from 'dummy/helpers/get-select-options';
import { module, test } from 'qunit';

let column, dataRows;

module('Unit | Helper | get select options', function(hooks) {
  hooks.beforeEach(function() {
    column = {
      key: 'yesorno',
      filter: {
        type: 'select',
        selectOptions: [
          { value: "yes" },
          { value: "no" }
        ]
      }
    };

    dataRows = [
      { yesorno: 'yes' },
      { yesorno: 'no' },
      { yesorno: 'maybe' },
    ];
  });

  test('it generates a unique set of select options for a select-type filter with automaticOptions', function(assert) {
    column.filter.automaticOptions = true;
    let opts = getSelectOptions([column, dataRows, false]);
    assert.deepEqual(opts, [
      { value: 'yes' },
      { value: 'no' },
      { value: 'maybe' }
    ]);
  });

  test('it generates select options case-insensitively, for select-type filters with automaticOptions', function(assert) {
    dataRows = [
      { yesorno: 'Yes' },
      { yesorno: 'yes' },
      { yesorno: 'YES' },
    ];

    column.filter.automaticOptions = true;
    let opts = getSelectOptions([column, dataRows, false]);
    assert.equal(opts.length, 1);
    assert.equal(opts[0].value.toLowerCase(), 'yes');
  });

  test('it returns the column\'s defined selectOptions for a select-type filter without automaticOptions', function(assert) {
    let opts = getSelectOptions([column, dataRows, false]);
    assert.deepEqual(opts, column.filter.selectOptions);
  });

  test('it throws an error if the column does not exist', function(assert) {
    assert.throws(() => getSelectOptions([null, dataRows, false]));
  });

  test('it throws an error if the column filter does not exist', function(assert) {
    column.filter = null;
    assert.throws(() => getSelectOptions([column, dataRows, false]));
  });

  test('it throws an error if the column filter is not of type select', function(assert) {
    column.filter.type = 'search';
    assert.throws(() => getSelectOptions([column, dataRows, false]));
  });

  test('it throws an error if automaticOptions is false and no selectOptions are specified', function(assert) {
    column.filter.selectOptions = null;
    assert.throws(() => getSelectOptions([column, dataRows, false]));
  });

  test('it throws an error if serverPaging and automaticOptions are both true', function(assert) {
    column.filter.automaticOptions = true;
    assert.throws(() => getSelectOptions([column, dataRows, true]));
  });
});
