// Seychelles districts and locations data

export const SEYCHELLES_DISTRICTS = [
  'Anse aux Pins',
  'Anse Boileau',
  'Anse Etoile',
  'Anse Royale',
  'Au Cap',
  'Baie Lazare',
  'Baie Sainte Anne',
  'Beau Vallon',
  'Bel Air',
  'Bel Ombre',
  'Cascade',
  'Glacis',
  'Grand Anse Mahe',
  'Grand Anse Praslin',
  'La Digue',
  'La Riviere Anglaise',
  'Les Mamelles',
  'Mont Buxton',
  'Mont Fleuri',
  'Plaisance',
  'Pointe Larue',
  'Port Glaud',
  'Roche Caiman',
  'Saint Louis',
  'Takamaka',
] as const

export type SeychellesDistrict = (typeof SEYCHELLES_DISTRICTS)[number]

export const INNER_ISLANDS = [
  'Mahé',
  'Praslin',
  'La Digue',
  'Silhouette',
  'Cerf Island',
  'Sainte Anne',
  'North Island',
  'Frégate',
  'Cousin',
  'Cousine',
] as const

export const OUTER_ISLANDS = [
  'Aldabra',
  'Desroches',
  'Farquhar',
  'Alphonse',
  'Cosmoledo',
  'Astove',
  'Assumption',
] as const
