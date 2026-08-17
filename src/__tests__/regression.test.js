// Plain-node regression checks: `npm test` (builds, then runs this with assert).
// One assertion per bug fixed — no framework.
const assert = require('assert');
const { Validation, FieldValidation } = require('../../lib/index.js');

// required + empty string must report "required", not run the condition
assert.deepStrictEqual(
  Validation.validate({ title: 'Name', type: 'text', required: true, currentValue: '', condition: 'gt', params: [3] }),
  { result: false, message: 'Name is Required' }
);

// 0 as a bound is a real bound, not "nothing to compare against"
assert.strictEqual(Validation.validate({ title: 'n', type: 'number', condition: 'gt', currentValue: -5, params: [0] }).result, false);
assert.strictEqual(Validation.validate({ title: 'n', type: 'number', condition: 'gt', currentValue: 5, params: [0] }).result, true);

// FieldValidation must survive a falsy value, a missing group and a missing `validation` key
assert.strictEqual(new FieldValidation({ title: 'n', type: 'number', currentValue: 0 }).currentValue, 0);
assert.strictEqual(new FieldValidation({ title: 'n', type: 'number', uid: '#1' }, { '#1': 0 }).currentValue, 0);
assert.strictEqual(new FieldValidation({ title: 'n', type: 'number', currentValue: 5 }).required, false);

// checkbox between compares how many are selected, not the array itself
assert.strictEqual(Validation.validate({ title: 'c', type: 'checkbox', condition: 'between', currentValue: ['a', 'b'], params: [1, 3] }).result, true);
assert.strictEqual(Validation.validate({ title: 'c', type: 'checkbox', condition: 'between', currentValue: ['a'], params: [1, 3] }).result, false);

// between needs both bounds; one bound must not silently compare against "now"
assert.deepStrictEqual(
  Validation.validate({ title: 'd', type: 'date', condition: 'between', currentValue: '06/15/2024', params: ['01/01/2024'] }),
  { result: true, message: '' }
);

// notBetween is the exact complement of between, boundaries included
const bounds = { title: 'd', type: 'date', currentValue: '01/01/2024', params: ['01/01/2024', '12/31/2024'] };
assert.strictEqual(Validation.validate({ ...bounds, condition: 'between' }).result, true);
assert.strictEqual(Validation.validate({ ...bounds, condition: 'notBetween' }).result, false);

const num = { title: 'n', type: 'number', currentValue: 25, params: [25, 30] };
assert.strictEqual(Validation.validate({ ...num, condition: 'between' }).result, false);
assert.strictEqual(Validation.validate({ ...num, condition: 'notBetween' }).result, true);

// group validation: falsy entries are validated, not skipped as valid
const group = Validation.validateWithGroup({ '#1': 0, '#2': 27 }, [
  { title: 'number 1', type: 'number', condition: 'gte', params: [1], uid: '#1' },
  { title: 'number 2', type: 'number', condition: 'between', params: [25, 30], uid: '#2' }
]);
assert.strictEqual(group['#1'].result, false);
assert.strictEqual(group['#2'].result, true);
assert.strictEqual(group.result, false);

// a param naming another field resolves from the entry map
const crossRef = Validation.validateWithGroup({ '#3': 40, '#4': 50 }, [
  { title: 'number 3', type: 'number', condition: 'gte', params: [1], uid: '#3' },
  { title: 'number 4', type: 'number', condition: 'between', params: [25, '#3'], uid: '#4' }
]);
assert.strictEqual(crossRef['#4'].result, false);

console.log('all regression checks passed');
