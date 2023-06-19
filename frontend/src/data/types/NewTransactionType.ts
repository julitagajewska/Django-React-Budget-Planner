export type NewTransactionType = {
    name: string,
    value: string,
    description: string,
    recipient: string,
    date: Date,
    walletID: number,
    categoryID: number,
    operationTypeID: number,
}