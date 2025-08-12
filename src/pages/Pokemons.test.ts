import { describe, it, expect } from 'vitest';
import { getPokemonImageUrl } from '@/pages/Pokemons';

describe('getPokemonImageUrl 함수', () => {
  it('올바른 포켓몬 이미지 URL을 생성해야 합니다.', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/111/';
    const imageUrl = getPokemonImageUrl(url);
    expect(imageUrl).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png',
    );
  });
});
