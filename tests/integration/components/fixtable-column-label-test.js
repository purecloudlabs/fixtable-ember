import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fixtable-column-label', 'Integration | Component | fixtable column label', {
  integration: true
});

test('it renders the header text if specified in the column definition', function(assert) {
  this.set('column', {
    key: 'key',
    header: 'header'
  });
  this.render(hbs`{{fixtable-column-label column=column}}`);

  assert.equal(this.$().text().trim(), 'header');
});

test('it renders the column key text if no header text is specified in the column definition', function(assert) {
  this.set('column', {
    key: 'key'
  });
  this.render(hbs`{{fixtable-column-label column=column}}`);

  assert.equal(this.$().text().trim(), 'key');
});

test('it renders only whitespace if hideLabel is set to true in the column definition', function(assert) {
  this.set('column', {
    key: 'key',
    header: 'header',
    hideLabel: true
  });
  this.render(hbs`{{fixtable-column-label column=column}}`);

  assert.equal(this.$().text().trim(), '');
});
