import "dotenv/config"
import jwt  from 'jsonwebtoken'
import { CardReturnType, CardType } from "../../domain/types/card.type";
import { TokenizationInterface } from "../../domain/interfaces/tokenization.interface";

//validate card info
export class Tokenization implements TokenizationInterface {
    generateToken(token:string, secret:string): string {
        const jwtToken = jwt.sign(token, secret);
        return jwtToken
    }
    async verifyToken(token:any):Promise<CardType>{
        console.log(token)
        return await new Promise((resolve, reject)=>{
            jwt.verify(token, "token", (err: any, decoded: any) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(decoded as CardType)
                }
              });
        })


    }

}