import { z } from 'zod';

export const PokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
  }),
  height: z.number(),
  weight: z.number(),
});
export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});
export type Pokemons = z.infer<typeof PokemonsSchema>;
