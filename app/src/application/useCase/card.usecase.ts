import { CardInterface } from "../../domain/interfaces/card.interface";
import { DatabaseInterface } from "../../domain/interfaces/database.interface";
import { TokenizationInterface } from "../../domain/interfaces/tokenization.interface";
import { CardReturnType, CardType } from "../../domain/types/card.type";

export class CardService implements CardInterface {
    constructor(private tokenization:TokenizationInterface, private database:DatabaseInterface, ){}

    async saveCard(card: CardType, token:string): Promise<string> {
        const jwtToken = this.tokenization.generateToken(token, "token")
        await this.database.store(card, jwtToken)
        return jwtToken
    }
    async getCard(jwtToken:string): Promise<any> {
        const cardInfo = JSON.parse(await this.database.retrive(jwtToken))
        await this.tokenization.verifyToken(jwtToken as any)
        delete cardInfo.cvv
        delete cardInfo.jwtToken
        return cardInfo as any
    }

}