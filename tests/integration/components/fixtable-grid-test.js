import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fixtable-grid', 'Integration | Component | fixtable grid', {
  integration: true
});

test('it renders', function(assert) {
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

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

  assert.ok(this.$('table').length); // there is a table element
  assert.ok(this.$('.fixtable').length); // there is an element with 'fixtable' class
});

test('it has clickable rows', function (assert) {
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

  this.on('rowClick', a => {
    assert.equal(a.name, 'Dudley Dursley');
  });

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows onRowClick=(action 'rowClick')}}`);

  const $row = this.$('tbody tr')[1];
  $row.click();
});

test('it renders the specified filter component', function(assert) {
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

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

  assert.ok(this.$('table th .custom-filter').length, 'Renders the filter component');
  assert.notOk(this.$('table th input.form-control').length, 'Does not renders the search text box');
  assert.notOk(this.$('table th select.form-control').length, 'Does not renders the drop-down list');
});

test('it renders the specified filter component when a type is specified', function(assert) {
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

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

  assert.ok(this.$('table th .custom-filter').length, 'Renders the filter component');
  assert.notOk(this.$('table th input.form-control').length, 'Does not renders the search text box');
  assert.notOk(this.$('table th select.form-control').length, 'Does not renders the drop-down list');
});
