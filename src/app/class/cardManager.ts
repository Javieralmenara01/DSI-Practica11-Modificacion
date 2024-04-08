import fs from 'fs';
import chalk from "chalk";
import { Card } from './card.js';
import { PowerToughness, CardOptions, UserOptions, Callback } from '../types/types.js';

/**
 * Read Card File Async
 * @param argv User Options
 * @param callback Callback Function
 */
export function readCardFile(argv: UserOptions, callback: Callback): void {
  fs.readFile(`./users/${argv.user}/${argv.id}.json`, (err, data) => {
    if (err) {
      callback(`Card not found at ${argv.user} collection!`, undefined);
    } else {
      try {
        const card: CardOptions = JSON.parse(data.toString());
        callback(undefined, card);
      } catch (parseError) {
        callback('Error parsing card data', undefined);
      }
    }
  });
}

/**
 * Class representing a card manager
 */
export class CardManager {

  /**
   * Create a directory for the user
   * @param {username} - The username 
   * @returns {boolean} - True if the directory is created, false if the directory already exists
   */
  private static createDirectory(username: string): boolean {
    if (fs.existsSync(`./users/${username}`)) {
      return false;
    } else {
      fs.mkdirSync(`./users/${username}`);
      return true;
    }
  }

  /**
   * Check if the directory exists
   * @param {username} - The username
   * @returns {boolean} - True if the directory exists, false if the directory does not exist
   */
  private static checkDirectory(username: string): boolean {
    return !fs.existsSync(`./users/${username}`);
  }

  /**
   * Create a card
   * @param {argv} - The card options
   * @returns {Card} - The card created
   */
  private static createCard(argv: CardOptions): Card {
    const powerToughness = argv.powerToughness ? (argv.powerToughness as string).split(',').map(Number) as PowerToughness : undefined;
    return new Card(argv.id, argv.name, argv.manaCost, argv.color, argv.type, argv.rarity, argv.rulesText, powerToughness, argv.loyaltyCounter, argv.value);
  }

  /**
   * Parse the card to show it
   * @param {user} - The username
   * @param {file} - The file
   * @returns {void}
   */
  private static parseShowCard(user: string, file: string): void {
    const card = JSON.parse(fs.readFileSync(`./users/${user}/${file}`, 'utf-8'));
    console.log(chalk.green(`ID: ${card.id}`));
    console.log(chalk.green(`Name: ${card.name}`));
    console.log(chalk.green(`Mana cost: ${card.manaCost}`));
    console.log(chalk.green(`Color: ${card.color}`));
    console.log(chalk.green(`Type: ${card.type}`));
    console.log(chalk.green(`Rarity: ${card.rarity}`));
    console.log(chalk.green(`Rules text: ${card.rulesText}`));
    if (card.powerToughness) {
      console.log(chalk.green(`Power: ${card.powerToughness[0]}`));
      console.log(chalk.green(`Toughness: ${card.powerToughness[1]}`));
    }
    if (card.loyaltyCounter) {
      console.log(chalk.green(`Loyalty counter: ${card.loyaltyCounter}`));
    }
    console.log(chalk.green(`Value: ${card.value}`));
  }  

  /**
   * Add a card to the collection
   * @param {argv} - The card options
   * @returns {void}
   */
  static addCard(argv: CardOptions): boolean {
    if (this.createDirectory(argv.user) || !fs.existsSync(`./users/${argv.user}/${argv.id}.json`)) {
      const card = this.createCard(argv);
      fs.writeFileSync(`./users/${argv.user}/${argv.id}.json`, JSON.stringify(card));
      console.log(chalk.green(`New card added to ${argv.user} collection!`));
      return true
    } else {
      console.log(chalk.red(`Card already exists at ${argv.user} collection!`));
      return false;
    }
  }

  /**
   * Update a card in the collection
   * @param {argv} - The card options
   * @returns {void}
   */
  static updateCard(argv: CardOptions): boolean {
    if (this.checkDirectory(argv.user) || !fs.existsSync(`./users/${argv.user}/${argv.id}.json`)) {
      console.log(chalk.red(`Card not found at ${argv.user} collection!`));
      return false;
    } else {
      const card = this.createCard(argv);
      fs.writeFileSync(`./users/${argv.user}/${argv.id}.json`, JSON.stringify(card));
      console.log(chalk.green(`Card updated at ${argv.user} collection!`));
      return true;
    }
  }

  /**
   * Remove a card from the collection
   * @param {argv} - The card options
   * @returns {void}
   */
  static removeCard(argv: UserOptions): boolean {
    if (this.checkDirectory(argv.user) || !fs.existsSync(`./users/${argv.user}/${argv.id}.json`)) {
      console.log(chalk.red(`Card not found at ${argv.user} collection!`));
      return false;
    } else {
      fs.unlinkSync(`./users/${argv.user}/${argv.id}.json`);
      console.log(chalk.green(`Card deleted from ${argv.user} collection!`));
      return true;
    }
  }

  /**
   * List all cards in the collection
   * @param {argv} - The user options
   * @returns {void}
   */
  static listCards(argv: UserOptions): boolean {
    if (this.checkDirectory(argv.user)) {
      console.log(chalk.red(`User does not exist!`));
      return false;
    } else {
      const files = fs.readdirSync(`./users/${argv.user}`);

      console.log(chalk.green(`Cards in ${argv.user} collection:`));
      files.forEach(file => {
        console.log('----------------------------')
        this.parseShowCard(argv.user, file);
      });
      return true;
    }
  }

  /**
   * Read a specific card in the collection
   * @param {argv} - The user options
   * @returns {void}
   */
  static readCard(argv: UserOptions): boolean {
    if (this.checkDirectory(argv.user)) {
      console.log(chalk.red(`User does not exist!`));
      return false;
    } else {
      readCardFile(argv, (error, card) => {
        if (error) {
          console.log(chalk.red(error));
        } else if (card) {
          console.log(chalk.green(`ID: ${card.id}`));
          console.log(chalk.green(`Name: ${card.name}`));
          console.log(chalk.green(`Mana cost: ${card.manaCost}`));
          console.log(chalk.green(`Color: ${card.color}`));
          console.log(chalk.green(`Type: ${card.type}`));
          console.log(chalk.green(`Rarity: ${card.rarity}`));
          console.log(chalk.green(`wRules text: ${card.rulesText}`));
        }
      });
      return true;
    }
  }
}
