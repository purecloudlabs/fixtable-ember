import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fixtable column header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a caret-up if the column is sortable and sorted ascending', async function(assert) {
    this.set('column', {
      key: 'key',
      sortable: true
    });
    this.set('sortBy', 'key');
    this.set('sortAscending', true);

    await render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

    assert.ok(findAll('.caret.caret-up').length);
  });

  test('it renders a caret if the column is sortable and sorted descending', async function(assert) {
    this.set('column', {
      key: 'key',
      sortable: true
    });
    this.set('sortBy', 'key');
    this.set('sortAscending', false);

    await render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

    assert.ok(findAll('.caret').length);
    assert.notOk(findAll('.caret.caret-up').length);
  });

  test('does not render a caret if the column is not sortable', async function(assert) {
    this.set('column', {
      key: 'key',
    });
    this.set('sortBy', 'key');
    this.set('sortAscending', false);

    await render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

    assert.notOk(findAll('.caret').length);
  });

  test('does not render a caret if the column is sortable but not the current sort-by column', async function(assert) {
    this.set('column', {
      key: 'key',
      sortable: true
    });
    this.set('sortBy', 'differentKey');
    this.set('sortAscending', false);

    await render(hbs`{{fixtable-column-header column=column sortBy=sortBy sortAscending=sortAscending}}`);

    assert.notOk(findAll('.caret').length);
  });
});
