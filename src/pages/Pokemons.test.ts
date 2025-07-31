import { describe, it, expect } from 'vitest';
import { getPokemonImageUrl } from '@/pages/Pokemons';
import { calculateLimit } from '@/hooks/usePokemons';

describe('getPokemonImageUrl 함수', () => {
  it('올바른 포켓몬 이미지 URL을 생성해야 합니다.', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/111/';
    const imageUrl = getPokemonImageUrl(url);
    expect(imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png',
    );
  });
});

describe('calculateLimit 함수', () => {
  it('scrollY가 제공되었을 때 올바른 limit을 계산해야 합니다.', () => {
    const scrollY = '200';
    const limit = calculateLimit(scrollY);
    expect(limit).toBe(35);
  });

  it('scrollY가 null일 때 기본 item 크기를 반환해야 합니다.', () => {
    const limit = calculateLimit(null);
    expect(limit).toBe(30);
  });
});
