import 'mocha';
import {expect} from 'chai';
import { UserOptions  } from '../src/app/types/types.js';
import { readCardFile } from '../src/app/class/cardManager.js'

describe('readCardFile tests', () => {

  it('readCardFile should get card information, id', (done) => {
    const user : UserOptions = { user: 'Javier', id: 1 };
    readCardFile(user, (_, data) => {
      if (data) {
        expect(data.id).to.be.equal(1);
        done();
      }
    });
  });

  it('readCardFile should get card information, id', (done) => {
    const user : UserOptions = { user: 'Javier', id: 2 };
    readCardFile(user, (_, data) => {
      if (data) {
        expect(data.id).to.be.equal(2);
        done();
      }
    });
  });

  it('readCardFile should get card information, name', (done) => {
    const user : UserOptions = { user: 'Javier', id: 2 };
    readCardFile(user, (_, data) => {
      if (data) {
        expect(data.name).to.be.equal("Counterspell");
        done();
      }
    });
  });

  it('readCardFile should get error', (done) => {
    const user : UserOptions = { user: 'Eduardo', id: 2 };
    readCardFile(user, (err) => {
      if (err) {
        expect(err).to.be.equal("Card not found at Eduardo collection!");
        done();
      }
    });
  });

  it('readCardFile should get error', (done) => {
    const user : UserOptions = { user: 'Antonio', id: 2 };
    readCardFile(user, (err) => {
      if (err) {
        expect(err).to.be.equal("Card not found at Antonio collection!");
        done();
      }
    });
  });

})