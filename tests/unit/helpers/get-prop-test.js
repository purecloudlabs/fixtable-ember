import { getProp } from 'dummy/helpers/get-prop';
import { module, test } from 'qunit';

module('Unit | Helper | get prop');

test('it returns the given property value for the object', function(assert) {
  var obj = { name: 'Fernando' };
  var propName = 'name';

  var result = getProp([obj, propName]);
  assert.equal(result, obj.name);
});

test('it coerces the result to null if the property value is undefined', function(assert) {
  var obj = {};
  var propName = 'foo';

  var result = getProp([obj, propName]);
  assert.equal(result, null);
});

test('it supports chaining properties with dot notation', function(assert) {
  var obj = {
    foo: {
      bar: 42
    }
  };
  var propName = 'foo.bar';

  var result = getProp([obj, propName]);
  assert.equal(result, 42);
});

test('it returns null if dot notation is used and any part of the property chain does not exist', function(assert) {
  var obj = {
    foo: {}
  };
  var propName = 'foo.bar.baz';

  var result = getProp([obj, propName]);
  assert.equal(result, null);
});

test('it returns null if the object is null', function(assert) {
  var obj = null;
  var propName = 'name';

  var result = getProp([obj, propName]);
  assert.equal(result, null);
});
