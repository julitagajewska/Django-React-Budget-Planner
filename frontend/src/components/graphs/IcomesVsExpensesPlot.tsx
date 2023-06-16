import React, { useEffect } from 'react'
import Plot from 'react-plotly.js'
import { TransactionType } from '../../data/types/Transactions'
import { filterTransactionsByMonthAndYear, filterTransactionsByType, getArrayOfSums, getLastSixMonths, getSumOfExpenses } from '../../utils/TransactionOperations'
import moment from 'moment'
import { scaleBand, scaleLinear } from 'd3'
import { get } from 'http'
import { MonthAndYearType } from '../../data/types/MonthAndYearType'
import GroupedBarChart from '../graphs_base/GroupedBarChart'
import BarChart from '../graphs_base/BarChart'

type IncomesVsExpensesPlotProps = {
    transactions: TransactionType[]
}

const IncomesVsExpensesPlot = ({ transactions }: IncomesVsExpensesPlotProps) => {

    // Get last six months
    var months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var monthsAndYears = getLastSixMonths(moment());

    var lastSixMonthsNames = monthsAndYears.map((monthAndYear) => months[monthAndYear.month - 1]);

    const getIncomes = filterTransactionsByType(1);
    const getExpenses = filterTransactionsByType(2);
    const filterByDate = filterTransactionsByMonthAndYear(monthsAndYears);

    const applyFunction = (
        array: TransactionType[] | TransactionType[][],
        howToModify: (input: TransactionType[] | TransactionType[][]) => TransactionType[] | TransactionType[][] | number[]) => {
        return howToModify(array)
    }

    var incomes: number[] = getArrayOfSums(filterByDate(getIncomes(transactions)))
    var expenses: number[] = getArrayOfSums(filterByDate(getExpenses(transactions)))

    var traceIncomes = {
        x: lastSixMonthsNames,
        y: incomes,
        name: 'Incomes',
        type: 'Bar'
    }

    var traceExpenses = {
        x: lastSixMonthsNames,
        y: expenses,
        name: 'Expenses',
        type: 'Bar'
    }

    var data = [traceIncomes, traceExpenses]

    var layout = {
        autosize: true,
        title: 'A Fancy Plot',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        responsive: true
    }

    // D3

    type IncomesVsExpensesDatasetEntryType = {
        monthID: number,
        month: string,
        yearID: number,
        incomeSum: number,
        expenseSum: number
    }

    // Dataset
    const getDataset = (monthsAndYears: MonthAndYearType[], incomes: number[], expenses: number[]) => {
        let dataset: IncomesVsExpensesDatasetEntryType[] = [];

        for (let i = 0; i < monthsAndYears.length; i++) {


            let datasetEntry: IncomesVsExpensesDatasetEntryType = {
                monthID: monthsAndYears[i].month,
                month: months[monthsAndYears[i].month - 1],
                yearID: monthsAndYears[i].year,
                incomeSum: incomes[i],
                expenseSum: expenses[i]
            }

            dataset.push(datasetEntry)
        }

        return dataset
    }

    const dataset = getDataset(monthsAndYears, incomes, expenses);
    // console.log(dataset)

    // Data accessors
    const getSum = (d: number) => d;
    const getMonth = (d: MonthAndYearType) => d.month;

    // X Axis
    // const incomesScale = scaleBand()
    //     .domain(dataset.map((entry: IncomesVsExpensesDatasetEntryType) => entry.month))
    //     .range([0, width])


    // const expensesScale = scaleBand();

    // // Y Scales
    // const yScale = scaleLinear();

    return (
        <BarChart dataset={dataset} />
        // <GroupedBarChart dataset={dataset} />
    )

    // return (
    //     // <Plot
    //     //     data={data}
    //     //     layout={layout} />

    //     <Plot
    //         data={[
    //             {
    //                 x: lastSixMonthsNames,
    //                 y: incomes,
    //                 type: 'bar',
    //                 name: 'Incomes',
    //                 marker: { color: 'green' },
    //             },
    //             {
    //                 x: lastSixMonthsNames,
    //                 y: expenses,
    //                 type: 'bar',
    //                 name: 'Incomes',
    //                 marker: { color: 'red' },
    //             }
    //         ]}
    //         layout={layout}
    //         config={{
    //             displayModeBar: false,
    //             responsive: true
    //         }}
    //     />
    // )
}

export default IncomesVsExpensesPlot