import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fixtable-column-header', 'Integration | Component | fixtable column header', {
  integration: true
});

test('it renders a caret-up if the column is sortable and sorted ascending', function(assert) {
  this.set('column', {
    key: 'key',
    sortable: true
  });
  this.set('sortBy', 'key');
  this.set('sortAscending', true);

  this.render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

  assert.ok(this.$('.caret.caret-up').length);
});

test('it renders a caret if the column is sortable and sorted descending', function(assert) {
  this.set('column', {
    key: 'key',
    sortable: true
  });
  this.set('sortBy', 'key');
  this.set('sortAscending', false);

  this.render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

  assert.ok(this.$('.caret').length);
  assert.notOk(this.$('.caret.caret-up').length);
});

test('does not render a caret if the column is not sortable', function(assert) {
  this.set('column', {
    key: 'key',
  });
  this.set('sortBy', 'key');
  this.set('sortAscending', false);

  this.render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

  assert.notOk(this.$('.caret').length);
});

test('does not render a caret if the column is sortable but not the current sort-by column', function(assert) {
  this.set('column', {
    key: 'key',
    sortable: true
  });
  this.set('sortBy', 'differentKey');
  this.set('sortAscending', false);

  this.render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

  assert.notOk(this.$('.caret').length);
});
