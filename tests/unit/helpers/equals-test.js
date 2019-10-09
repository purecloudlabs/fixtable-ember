import { equals } from 'dummy/helpers/equals';
import { module, test } from 'qunit';

module('Unit | Helper | equals', function() {
  test('it returns true if two primitives are equal', function(assert) {
    let result = equals([42, 42]);
    assert.ok(result);
  });

  test('it returns true if both values are null/undefined/empty', function(assert) {
    let result = equals([null, undefined]);
    assert.ok(result);

    result = equals([null, '']);
    assert.ok(result);

    result = equals(['', undefined]);
    assert.ok(result);
  });

  test('it returns true if two objects are reference equal', function(assert) {
    var foo = {};
    var bar = foo;

    let result = equals([foo, bar]);
    assert.ok(result);
  });

  test('it returns false if two primitives are not equal', function(assert) {
    let result = equals([7, 42]);
    assert.notOk(result);
  });

  test('it returns false if two objects are not reference equal', function(assert) {
    var foo = {};
    var bar = {};

    let result = equals([foo, bar]);
    assert.notOk(result);
  });
});
