export interface TokenizationInterface {
    generateToken(token:string, secret:string):string
    verifyToken(token:string):Promise<any>
}