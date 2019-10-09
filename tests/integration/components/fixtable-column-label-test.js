import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fixtable column label', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the header text if specified in the column definition', async function(assert) {
    this.set('column', {
      key: 'key',
      header: 'header'
    });
    await render(hbs`{{fixtable-column-label column=column}}`);

    assert.equal(find('*').textContent.trim(), 'header');
  });

  test('it renders the column key text if no header text is specified in the column definition', async function(assert) {
    this.set('column', {
      key: 'key'
    });
    await render(hbs`{{fixtable-column-label column=column}}`);

    assert.equal(find('*').textContent.trim(), 'key');
  });

  test('it renders only whitespace if hideLabel is set to true in the column definition', async function(assert) {
    this.set('column', {
      key: 'key',
      header: 'header',
      hideLabel: true
    });
    await render(hbs`{{fixtable-column-label column=column}}`);

    assert.equal(find('*').textContent.trim(), '');
  });
});
