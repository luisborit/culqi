import { Tokenization } from '../src/infraestrucutre/resources/tokenization.rsrc'
import { Database } from '../src/infraestrucutre/resources/database.rsrc'
import { CardImplementation } from '../src/infraestrucutre/implementations/card.implementations'
//Following AAA aproach
describe('Tokenization test', () => {

  test(`add token and secret  as inputs for
  generateToken method on Tokenization class`, () => {
    // Arrange
    const tokenization = new Tokenization();
    const token = "PK_test_token"
    const secret = "testSecret"

    // Act
    const result = tokenization.generateToken(token, secret);

    // Assert
    expect(typeof result).toBe('string');
  });
});

describe('Database test', () => {

  test(`add jwtToken and card object as inputs for
  store method from Database class`, async () => {
    // Arrange
    const database = new Database();
    const token = "eyJhbGciOiJIUzI1NiJ9.UEtfdGVzdF90b2tlbg.-6tjxoVZ52IfF-y1-WUS8UfEn8YIrNS4O9rW_HyvarM"
    const card = JSON.stringify({
      "email":"test@hotmail.com",
      "card_number":"4111111111111111",
      "cvv":"123",
      "expiration_year":"2025",
      "expiration_month":"09"
    })
    const spy = jest.spyOn(database, 'store');

    // Act
    await database.store(token, card);

    // Assert
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('Card Use Case test', () => {

  test(`not happy path for save card method
  from card implementation class`, async () => {
    // Arrange
    const cardImplementation = new CardImplementation();
    const token = "eyJhbGciOiJIUzI1NiJ9.UEtfdGVzdF90b2tlbg.-6tjxoVZ52IfF-y1-WUS8UfEn8YIrNS4O9rW_HyvarM"
    const card = {
      "email":"test@hotmail.com",
      "card_number":"411111111111",
      "cvv":"12311",
      "expiration_year":"202",
      "expiration_month":"0"
    }

    // console.log(await cardImplementation.saveCard(card, token))
    // Act & Assert
    await expect(cardImplementation.saveCard(card, token)).rejects.toThrow(Error);
  });
});