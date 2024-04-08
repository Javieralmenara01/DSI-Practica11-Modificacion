import { PowerToughness, Color, LineType, Rarity } from '../types/types.js'

/**
 * Class that represents a card
 * @param {id} - Identifier of the card
 * @param {name} - Name of the card
 * @param {manaCost} - Mana cost of the card
 * @param {color} - Color of the card
 * @param {type} - Line of Type of the card
 * @param {rarity} - Rarity of the card
 * @param {rulesText} - Rules text of the card
 * @param {powerToughness} - Power and toughness of the card
 * @param {loyaltyCounter} - Loyalty counter of the card
 * @param {value} - Value of the card
 */
export class Card {
  constructor(
    private id: number,
    private name: string,
    private manaCost: number,
    private color: Color,
    private type: LineType,
    private rarity: Rarity,
    private rulesText: string,
    private powerToughness: PowerToughness | undefined,
    private loyaltyCounter: string | undefined,
    private value: number
  ) {}

  /**
   * Method that returns the card's id
   * @return {number} - Identifier of the card
   */
  getId(): number {
    return this.id;
  }

  /**
   * Method that returns the card's name
   * @return {string} - Name of the card
   */
  getName(): string {
    return this.name;
  }

  /**
   * Method that returns the card's mana cost
   * @return {number} - Mana cost of the card
   */
  getManaCost(): number {
    return this.manaCost;
  }

  /**
   * Method that returns the card's color
   * @return {Color} - Color of the card
   */
  getColor(): Color {
    return this.color;
  }

  /**
   * Method that returns the card's type
   * @return {LineType} - Line of Type of the card
   */
  getType(): LineType {
    return this.type;
  }

  /**
   * Method that returns the card's rarity
   * @return {Rarity} - Rarity of the card
   */ 
  getRarity(): Rarity {
    return this.rarity;
  }

  /**
   * Method that returns the card's rules text
   * @return {string} - Rules text of the card
   */
  getRulesText(): string {
    return this.rulesText;
  }

  /**
   * Method that returns the card's power and toughness
   * @return {string} - Power and toughness of the card
   */ 
  getPowerToughness(): PowerToughness | undefined {
    return this.powerToughness;
  }

  /**
   * Method that returns the card's loyalty counter
   * @return {string} - Loyalty counter of the card
   */
  getLoyaltyCounter(): string | undefined {
    return this.loyaltyCounter;
  }

  /**
   * Method that returns the card's value
   * @return {number} - Value of the card
   */
  getValue(): number {
    return this.value;
  }
}