import { CardInterface } from "../../domain/interfaces/card.interface";
import { CardType, CardReturnType } from "../../domain/types/card.type";
import { CardService } from "../../application/useCase/card.usecase";
import { Tokenization } from "../resources/tokenization.rsrc";
import { Database } from "../resources/database.rsrc";
import Joi, { Schema } from 'joi';

function luhnAlgorithm(cardNumber: string): boolean {
  const digitsOnly = cardNumber.replace(/\D/g, '');

  let sum = 0;
  let isAlternate = false;
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = parseInt(digitsOnly.charAt(i), 10);

    if (isAlternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isAlternate = !isAlternate;
  }
  return sum % 10 === 0;
}

function hasMaximum5YearsAhead(year: number): boolean {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;
  
  return year <= maxYear;
}

function isValidEmailDomain(email: string): boolean {
  const validDomains = /(gmail\.com|hotmail\.com|yahoo\.es)$/i;
  return validDomains.test(email);
}

const cardSchema: Schema<CardType> = Joi.object({
    email: Joi.string().email().required(),
    card_number: Joi.string().length(16).creditCard().custom((value, helpers) => {
      if (!luhnAlgorithm(value)) {
        return helpers.error('invalid');
      }
      return value;
    }).required(),
    cvv: Joi.string().min(3).max(4).required(),
    expiration_year: Joi.string().length(4).custom((value, helpers) => {
      if (!hasMaximum5YearsAhead(value)) {
        return helpers.error('invalid');
      }
      return value;
    }).required(),
    expiration_month: Joi.string().length(2).custom((value, helpers) => {
      if (!isValidEmailDomain(value)) {
        return helpers.error('invalid');
      }
      return value;
    }).required(),
  });
export class CardImplementation implements CardInterface{
   private cardService:CardService

    constructor(){
        this.cardService = new CardService(new Tokenization(), new Database())
    }
    async saveCard(card:CardType, token:string): Promise<string> {
      const {error}=cardSchema.validate(card);
      if(error){
        throw new Error(error as any)
      }
      return await this.cardService.saveCard(card, token)
    }

    async getCard(jwtToken:string): Promise<CardReturnType|Error> {
       return await this.cardService.getCard(jwtToken)
    }
}