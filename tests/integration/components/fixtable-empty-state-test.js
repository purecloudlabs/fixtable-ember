import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fixtable-empty-state', 'Integration | Component | fixtable empty state', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{fixtable-empty-state}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#fixtable-empty-state}}
      template block text
    {{/fixtable-empty-state}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
