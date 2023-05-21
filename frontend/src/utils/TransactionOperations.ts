import { TransactionType } from "../data/types/Transactions";

export const getIncomes = (transactions: TransactionType[]): TransactionType[] => {
    let incomes: TransactionType[] = [];
    incomes = transactions.filter((transaction: TransactionType) => transaction.transactionTypeID === 1);
    return incomes;
}

export const getTotalIncomesValue = (incomes: TransactionType[]): number => {
    let sum: number = 0;
    incomes.forEach((income) => sum = sum + +income.value);
    return sum;
}

export const getExpenses = (transactions: TransactionType[]): TransactionType[] => {
    let expenses: TransactionType[] = [];
    expenses = transactions.filter((transaction: TransactionType) => transaction.transactionTypeID === 2);
    return expenses;
}

export const getTotalExpensesValue = (expenses: TransactionType[]): number => {
    let sum: number = 0;
    expenses.forEach((expense) => sum = sum + +expense.value);
    return sum;
}