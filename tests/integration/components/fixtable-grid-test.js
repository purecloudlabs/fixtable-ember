import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fixtable grid', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('columnDefs', [
      { key: 'name', header: 'Name', width: 200 },
      { key: 'address', header: 'Address' }
    ]);
    this.set('dataRows', [
      { name: 'Sherlock Holmes ', address: '221B Baker Street' },
      { name: 'Dudley Dursley', address: '4 Privet Drive' },
      { name: 'Hank Hill', address: '84 Rainey Street' },
      { name: 'Gandalf Stormcrow' }
    ]);

    await render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

    assert.ok(findAll('table').length); // there is a table element
    assert.ok(findAll('.fixtable').length); // there is an element with 'fixtable' class
  });

  test('it has clickable rows', async function(assert) {
    assert.expect(1);

    this.set('columnDefs', [
      { key: 'name', header: 'Name', width: 200 },
      { key: 'address', header: 'Address' }
    ]);
    this.set('dataRows', [
      { name: 'Sherlock Holmes ', address: '221B Baker Street' },
      { name: 'Dudley Dursley', address: '4 Privet Drive' },
      { name: 'Hank Hill', address: '84 Rainey Street' },
      { name: 'Gandalf Stormcrow' }
    ]);

    this.actions.rowClick = a => {
      assert.equal(a.name, 'Dudley Dursley');
    };

    await render(hbs`{{fixtable-grid columns=columnDefs content=dataRows onRowClick=(action 'rowClick')}}`);

    const $row = this.$('tbody tr')[1];
    $row.click();
  });

  test('it renders the specified filter component', async function(assert) {
    assert.expect(3);

    this.set('columnDefs', [
      {
        key: 'test',
        filter: {
          component: 'test-filter'
        }
      }
    ]);
    this.set('dataRows', [
      { test: 'test' }
    ]);

    await render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

    assert.ok(findAll('table th .custom-filter').length, 'Renders the filter component');
    assert.notOk(findAll('table th input.form-control').length, 'Does not renders the search text box');
    assert.notOk(findAll('table th select.form-control').length, 'Does not renders the drop-down list');
  });

  test('it renders the specified filter component when a type is specified', async function(assert) {
    assert.expect(3);

    this.set('columnDefs', [
      {
        key: 'test',
        filter: {
          component: 'test-filter',
          type: 'search'
        }
      }
    ]);
    this.set('dataRows', [
      { test: 'test' }
    ]);

    await render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

    assert.ok(findAll('table th .custom-filter').length, 'Renders the filter component');
    assert.notOk(findAll('table th input.form-control').length, 'Does not renders the search text box');
    assert.notOk(findAll('table th select.form-control').length, 'Does not renders the drop-down list');
  });
});
