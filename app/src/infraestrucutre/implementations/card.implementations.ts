import { CardInterface } from "../../domain/interfaces/card.interface";
import { CardType, CardReturnType } from "../../domain/types/card.type";
import { CardService } from "../../application/useCase/card.usecase";
import { Tokenization } from "../resources/tokenization.rsrc";
import { Database } from "../resources/database.rsrc";

export class CardImplementation implements CardInterface{
   private cardService:CardService

    constructor(){
        this.cardService = new CardService(new Tokenization(), new Database())
    }
    async saveCard(card:CardType, token:string): Promise<string> {
        return await this.cardService.saveCard(card, token)
    }

    async getCard(jwtToken:string): Promise<CardReturnType|Error> {
       return await this.cardService.getCard(jwtToken)
    }
}