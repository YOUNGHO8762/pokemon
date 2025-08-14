import { describe, it, expect } from 'vitest';
import { calculateLimit } from '@/hooks/useInfinitePokemons';
import { POKEMON_PAGE_SIZE, POKEMON_ITEM_SIZE } from '@/constants';
import { getStartIndexFromScroll } from '@/lib/utils';

describe('calculateLimit 함수', () => {
  it('scrollY가 제공되었을 때 올바른 limit을 계산해야 합니다.', () => {
    const scrollY = '200';
    const limit = calculateLimit(scrollY);
    expect(limit).toBe(
      getStartIndexFromScroll(Number(scrollY), POKEMON_ITEM_SIZE) +
        POKEMON_PAGE_SIZE,
    );
  });

  it('scrollY가 null일 때 기본 item 크기를 반환해야 합니다.', () => {
    const limit = calculateLimit(null);
    expect(limit).toBe(POKEMON_PAGE_SIZE);
  });
});
