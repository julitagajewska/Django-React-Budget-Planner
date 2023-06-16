import exp from "constants";
import { MonthAndYearType } from "../data/types/MonthAndYearType";
import { TransactionType } from "../data/types/Transactions";
import moment, {Moment} from 'moment';
import Transactions from "../pages/Transactions";
import { CategoryType } from "../data/types/Index";

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

export const getSumOfExpenses = (transactions: TransactionType[], monthAndYear: MonthAndYearType[]) => {

    let expenses = getExpenses(transactions);
    let sumOfExpenses: number[] = [];
    
    monthAndYear.forEach((monthAndYearEntry: MonthAndYearType) => {

        let sum = 0;

        expenses.forEach((expense: TransactionType) => {
            if (+moment(expense.date).format('M') === monthAndYearEntry.month && +moment(expense.date).format('YYYY') === monthAndYearEntry.year) sum+= +expense.value
        })

        sumOfExpenses.push(sum);
    })
    
    return sumOfExpenses
    // For each month
    // Filter tranactions by month and year
    // Filter by transaction type
    // Sum values
}

export const filterTransactionsByType = (type: number) => {
    return (transactions: TransactionType[]) => {
        return transactions.filter((transaction: TransactionType) => transaction.transactionTypeID === type)
    }
}

// export const filterTransactionsByMonth = (transactions: TransactionType[]) => {
//     const filterTransactionsByType = (month: number, year: number) => {
//         return transactions.filter((transaction: TransactionType) => +moment(transaction.date).format('M') === month && +moment(transaction.date).format('YYYY') === year)
//     }
//     return filterTransactionsByType;
// }

export const filterTransactionsByMonthAndYear = (monthAndYear: MonthAndYearType[]) => {
    return (transactions: TransactionType[]): TransactionType[][] => {
        let groupedTransactions: TransactionType[][] = [];

        monthAndYear.forEach((monthAndYearEntry: MonthAndYearType) => {
            groupedTransactions.push(
                transactions.filter((transaction: TransactionType) => +moment(transaction.date).format('M') === monthAndYearEntry.month && +moment(transaction.date).format('YYYY') === monthAndYearEntry.year)
            )
        })

        return groupedTransactions;
    }
}

export const filterTransactionsByCategories = (categories: CategoryType[]) => {
    return (transactions: TransactionType[]): TransactionType[][] => {
        let groupedTransactions: TransactionType[][] = [];

        categories.forEach((category) => {
            groupedTransactions.push(
                transactions.filter((transaction: TransactionType) => transaction.categoryID === category.id)
            )
        })

        return groupedTransactions;
    }
}


export const getArrayOfSums = (groupedTransactions: TransactionType[][]): number[] => {
    let sums: number[] = [];

    groupedTransactions.forEach((transacionSet) => sums.push(transacionSet.reduce((acc, transaction) => acc + +(transaction.value), 0)))

    return sums
}

export const getLastSixMonths = (today: Moment): MonthAndYearType[] => {
    let currentMonth: number = +today.format('M');
    let currentYear: number = +today.format('YYYY');

    let months: MonthAndYearType[] = [];

    for(let i = 9; i>=0; i--) {

        let targetMonth: number = currentMonth-i;
        let targetYear: number = currentYear;

        // console.log(currentMonth);

        if(targetMonth <= 0) {
            targetYear--
            targetMonth = 12 + targetMonth
        }

        months.push({
            month: targetMonth,
            year: targetYear
        })
    }

    return months;
}

export const getRecentTransactionsArray = (transactions: TransactionType[]) => transactions.reverse().slice(0, 5);