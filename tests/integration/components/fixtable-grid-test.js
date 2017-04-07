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
    { name: 'Gandalf Stormcrow' },
  ]);

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows}}`);

  assert.ok(this.$('table').length); // there is a table element
  assert.ok(this.$('.fixtable').length); // there is an element with 'fixtable' class
});

test('it has clickable rows', function (assert) {
  const done = assert.async();
  assert.expect(1);

  this.set('columnDefs', [
    { key: 'name', header: 'Name', width: 200 },
    { key: 'address', header: 'Address' }
  ]);
  this.set('dataRows', [
    { name: 'Sherlock Holmes ', address: '221B Baker Street' },
    { name: 'Dudley Dursley', address: '4 Privet Drive' },
    { name: 'Hank Hill', address: '84 Rainey Street' },
    { name: 'Gandalf Stormcrow' },
  ]);

  let rowClicked = null;

  this.rowClick = function (row) {
    rowClicked = row;
    done();
  };

  this.render(hbs`{{fixtable-grid columns=columnDefs content=dataRows onRowClick=rowClick}}`);

  const $row = this.$('tbody tr')[1];
  $row.click();

});
