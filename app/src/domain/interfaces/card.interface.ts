import { CardReturnType, CardType } from "../types/card.type"
export interface CardInterface {
    getCard(jwtToken:string, token:string):Promise<CardReturnType|Error>
    saveCard(card: CardType, token:string):Promise<string>
}