import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fixtable footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('currentPage', 2);
    this.set('totalPages', 3);
    this.set('pageSize', 25);
    this.set('pageSizeOptions', [25, 50, 100]);

    await render(
      hbs`{{fixtable-footer class='fixtable-footer' currentPage=currentPage totalPages=totalPages pageSize=pageSize pageSizeOptions=pageSizeOptions}}`
    );
    assert.ok(findAll('.fixtable-footer').length); // there is an element with the fixtable-footer class
  });
});
