/**
 * Type representing the power and toughness of a Magic card
 */
export type PowerToughness = [number, number];

/**
 * Numbered representing the colors of Magic cards
 */
export enum Color {
  White,
  Blue,
  Black,
  Red,
  Green,
  Colorless,
  Multicolor
}

/**
 * Numbered representing the types of Magic cards
 */
export enum LineType {
  Creature,
  Planeswalker,
  Instant,
  Sorcery,
  Enchantment,
  Artifact,
  Land
}

/**
 * Numbered representing the rarities of Magic cards
 */
export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Mythic
}

/**
 * Interface representing a card options of yargs
 */
export interface CardOptions {
  user: string;
  id: number;
  name: string;
  manaCost: number;
  color: Color;
  type: LineType;
  rarity: Rarity;
  rulesText: string;
  powerToughness?: string;
  loyaltyCounter?: string;
  value: number;
}

/**
 * Interface representing a user options of yargs
 */
export interface UserOptions {
  user: string;
  id?: number;
}

/**
 * Callback type
 */
export type Callback = (error: string | undefined, card: CardOptions | undefined) => void;