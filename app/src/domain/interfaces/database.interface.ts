import { CardType } from "../types/card.type"

export interface DatabaseInterface {
    store(card:CardType, token:string):Promise<void>
    retrive(token:string):Promise<any>
}