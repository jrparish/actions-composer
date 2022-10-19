import { describe, it, expect } from 'vitest';

import { camelToSnake, renameKeys } from '../utils';

describe('renameKeys', () => {
  it('should rename keys in a map to given value', () => {
    const obj = { oldKey: 'value', arr: [{ oldKey: 'different value' }] };
    const expected = { newKey: 'value', arr: [{ newKey: 'different value' }] };
    expect(renameKeys(obj, { oldKey: 'newKey' })).toEqual(expected);
  });
});

describe('camelToSnake', () => {
  it('should convert camel case to underscore case', () => {
    expect(camelToSnake('camelCaseString')).toBe('camel_case_string');
  });
});
