import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fixtable-footer', 'Integration | Component | fixtable footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('currentPage', 2);
  this.set('totalPages', 3);
  this.set('pageSize', 25);
  this.set('pageSizeOptions', [5, 15, 25, 50, 100]);

  this.render(hbs`{{fixtable-footer currentPage=currentPage totalPages=totalPages pageSize=pageSize pageSizeOptions=pageSizeOptions}}`);

  assert.ok(this.$('.fixtable-footer').length); // there is an element with the fixtable-footer class
});
