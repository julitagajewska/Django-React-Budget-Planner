export type TransactionType= {
    id: number,
    name: string,
    value: string,
    description: string,
    recipient: string,
    date: Date,
    walletID: number,
    categoryID: number,
    operationTypeID: number,
}