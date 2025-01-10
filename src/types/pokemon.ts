export interface Pokemon {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}
