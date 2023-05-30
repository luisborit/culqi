export type CardType = {
    email:string
    card_number: string
    cvv?: string
    expiration_year: string
    expiration_month: string
}



export type CardReturnType = {
    email:string
    card_number: string
    expiration_year: string
    expiration_month: string
}