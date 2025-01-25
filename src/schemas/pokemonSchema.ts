import { z } from 'zod';

const SpritesSchema = z.object({
  front_default: z.string(),
});

export const pokemonSchema = z.object({
  name: z.string(),
  sprites: SpritesSchema,
  height: z.number(),
  weight: z.number(),
});
export type Pokemon = z.infer<typeof pokemonSchema>;

const PokemonSummarySchema = z.object({
  name: z.string(),
  url: z.string(),
});
export type PokemonSummary = z.infer<typeof PokemonSummarySchema>;

export const pokemonsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonSummarySchema),
});
export type PokemonsResponse = z.infer<typeof pokemonsResponseSchema>;
