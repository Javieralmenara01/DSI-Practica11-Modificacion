import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Color, LineType, Rarity, CardOptions, UserOptions } from './types/types.js';
import { CardManager } from './class/cardManager.js';

/**
 * Main function
 */
yargs(hideBin(process.argv))
  /**
   * Add, update, remove, list and read commands
   */
  .command('add', 'Adds a card to the collection', {
    user: {
      type: 'string',
      demandOption: true,
      describe: 'Username'
    },
    id: {
      type: 'number',
      demandOption: true,
      describe: 'Card identifier'
    },
    name: {
      type: 'string',
      demandOption: true,
      describe: 'Card name'
    },
    manaCost: {
      type: 'number',
      demandOption: true,
      describe: 'Card mana cost'
    },
    color: {
      type: 'string',
      demandOption: true,
      describe: 'Card color',
      coerce: (arg) => {
        if (!Object.values(Color).includes(arg)) {
          throw new Error('Invalid card color');
        }
        return arg;
      }
    },
    type: {
      type: 'string',
      demandOption: true,
      describe: 'Card type',
      coerce: (arg) => {
        if (!Object.values(LineType).includes(arg)) {
          throw new Error('Invalid card type');
        }
        return arg;
      }
    },
    rarity: {
      type: 'string',
      demandOption: true,
      describe: 'Card rarity',
      coerce: (arg) => {
        if (!Object.values(Rarity).includes(arg)) {
          throw new Error('Invalid card rarity');
        }
        return arg;
      }
    },
    rulesText: {
      type: 'string',
      demandOption: true,
      describe: 'Card rules text'
    },
    powerToughness: {
      type: 'string',
      demandOption: false,
      describe: 'Card power and toughness'
    },
    loyaltyCounter: {
      type: 'number',
      demandOption: false,
      describe: 'Card loyalty counter'
    },
    value: {
      type: 'number',
      demandOption: true,
      describe: 'Card value'
    }
  }, (argv) => {
    const options: CardOptions = argv as CardOptions;
    CardManager.addCard(options);
  })
    
  .command('update', 'Updates a card in the collection', {
    user: {
      type: 'string',
      demandOption: true,
      describe: 'Username'
    },
    id: {
      type: 'number',
      demandOption: true,
      describe: 'Card identifier'
    },
    name: {
      type: 'string',
      demandOption: true,
      describe: 'Card name'
    },
    manaCost: {
      type: 'number',
      demandOption: true,
      describe: 'Card mana cost'
    },
    color: {
      type: 'string',
      demandOption: true,
      describe: 'Card color',
      coerce: (arg) => {
        if (!Object.values(Color).includes(arg)) {
          throw new Error('Invalid card color');
        }
        return arg;
      }
    },
    type: {
      type: 'string',
      demandOption: true,
      describe: 'Card type',
      coerce: (arg) => {
        if (!Object.values(LineType).includes(arg)) {
          throw new Error('Invalid card type');
        }
        return arg;
      }
    },
    rarity: {
      type: 'string',
      demandOption: true,
      describe: 'Card rarity',
      coerce: (arg) => {
        if (!Object.values(Rarity).includes(arg)) {
          throw new Error('Invalid card rarity');
        }
        return arg;
      }
    },
    rulesText: {
      type: 'string',
      demandOption: true,
      describe: 'Card rules text'
    },
    powerToughness: {
      type: 'string',
      demandOption: false,
      describe: 'Card power and toughness'
    },
    loyaltyCounter: {
      type: 'number',
      demandOption: false,
      describe: 'Card loyalty counter'
    },
    value: {
      type: 'number',
      demandOption: true,
      describe: 'Card value'
    }
  }, (argv) => {
    const options: CardOptions = argv as CardOptions;
    CardManager.updateCard(options);
  })
    
  .command('remove', 'Deletes a card from the collection', {
    user: {
      type: 'string',
      demandOption: true,
      describe: 'Username'
    },
    id: {
      type: 'number',
      demandOption: true,
      describe: 'Card identifier'
    }
  }, (argv) => {
    const options = { user: argv.user as string, id: argv.id as number };
    CardManager.removeCard(options);
  })
    
  .command('list', 'Lists all cards in the collection', {
    user: {
      type: 'string',
      demandOption: true,
      describe: 'Username'
    }
  }, (argv) => {
    const options: UserOptions = argv as UserOptions;
    CardManager.listCards(options);
  })
  
  .command('read', 'Shows details of a specific card', {
    user: {
      type: 'string',
      demandOption: true,
      describe: 'Username'
    },
    id: {
      type: 'number',
      demandOption: true,
      describe: 'Card identifier'
    }
  }, (argv) => {
    const options = { user: argv.user as string, id: argv.id as number };
    CardManager.readCard(options);
  })
  .help()
  .argv;