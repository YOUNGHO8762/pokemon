import { describe, it, expect } from 'vitest';
import { calculateLimit } from '@/hooks/useInfinitePokemons';
import { DEFAULT_LIMIT } from '@/api/pokemonApis';
import { getStartIndexFromScroll } from '@/lib/utils';
import { POKEMON_ITEM_SIZE } from '@/pages/Pokemons';

describe('calculateLimit 함수', () => {
  it('scrollY가 제공되었을 때 올바른 limit을 계산해야 합니다.', () => {
    const scrollY = '200';
    const limit = calculateLimit(scrollY);
    expect(limit).toBe(
      getStartIndexFromScroll(Number(scrollY), POKEMON_ITEM_SIZE) +
        DEFAULT_LIMIT,
    );
  });

  it('scrollY가 null일 때 기본 item 크기를 반환해야 합니다.', () => {
    const limit = calculateLimit(null);
    expect(limit).toBe(DEFAULT_LIMIT);
  });
});
