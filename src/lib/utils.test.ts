/* eslint-disable no-constant-binary-expression */
import { describe, it, expect } from 'vitest';
import { cn, getNthSubstring, getStartIndexFromScroll } from '../lib/utils';

describe('cn 함수', () => {
  it('인자가 없을 때 빈 문자열을 반환해야 합니다.', () => {
    expect(cn()).toBe('');
  });

  it('하나의 클래스 이름이 주어지면 해당 클래스 이름을 반환해야 합니다.', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('여러 클래스 이름이 주어지면 공백으로 구분된 병합된 클래스 이름을 반환해야 합니다.', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('조건부로 주어진 클래스 이름을 올바르게 병합하여 유효한 클래스 이름만 반환해야 합니다.', () => {
    expect(cn('class1', false && 'class2', 'class3', undefined)).toBe(
      'class1 class3',
    );
  });
});

describe('getNthSubstring 함수', () => {
  it('유효한 인덱스가 주어지면 해당 인덱스의 하위 문자열을 반환해야 합니다.', () => {
    expect(getNthSubstring('a,b,c', ',', 1)).toBe('b');
  });

  it('음수 인덱스가 주어지면 뒤에서부터 계산하여 해당 하위 문자열을 반환해야 합니다.', () => {
    expect(getNthSubstring('a,b,c', ',', -1)).toBe('c');
  });

  it('인덱스가 범위를 벗어나면 undefined를 반환해야 합니다.', () => {
    expect(getNthSubstring('a,b,c', ',', 3)).toBeUndefined();
  });

  it("''을 ,로 split하면 ['']이므로 0번째 인덱스에 접근하면 ''를 반환해야 합니다.", () => {
    expect(getNthSubstring('', ',', 0)).toBe('');
  });
});

describe('getStartIndexFromScroll 함수', () => {
  it('스크롤 값이 0일 때 시작 인덱스로 0을 반환해야 합니다.', () => {
    expect(getStartIndexFromScroll(0, 10)).toBe(0);
  });

  it('양의 스크롤 값이 주어지면 해당 스크롤에 맞는 시작 인덱스를 반환해야 합니다.', () => {
    expect(getStartIndexFromScroll(100, 10)).toBe(10);
  });

  it('음의 스크롤 값이 주어지면 0을 반환해야 합니다.', () => {
    expect(getStartIndexFromScroll(-1000, 10)).toBe(0);
  });
});
