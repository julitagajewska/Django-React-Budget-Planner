import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { getUsersWallets, getWalletsTransactionCategories, getWalletsTransactions } from '../services';
import LoggedInPageContainer from '../layout/LoggedInPageContainer';
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import { WalletType } from '../context/WalletContext';
import moment, { Moment } from 'moment';
import { getExpenses, getIncomes, getRecentTransactionsArray, getTotalExpensesValue, getTotalIncomesValue } from '../utils/Index';
import IncomesVsExpensesPlot from '../components/graphs/IcomesVsExpensesPlot';
import TransactionDistribution from '../components/graphs/TransactionDistribution';
import { TransactionCategoryType, TransactionType, CategoryType } from '../data/types/Index';
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import IncomesExpensesOverTime from '../components/graphs/IncomesExpensesOverTime';

const Home = () => {

    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    const [wallets, setWallets] = useState<WalletType[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<WalletType>();
    const [walletsDropdownVisible, setWalletsDropdownVisible] = useState(false);
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<TransactionType[]>([])
    const [incomesTotal, setIncomesTotal] = useState<number>(0);
    const [expensesTotal, setExpensesTotal] = useState<number>(0);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [transactionCategories, setTransactionCategories] = useState<TransactionCategoryType[]>([]);

    // Line chart
    const [startDate, setStartDate] = useState<Moment>(moment('2023-01'));
    const [endDate, setEndDate] = useState<Moment>(moment('2023-06'));
    const [lineChartDropdownVisible, setLineChartDropdownVisible] = useState<boolean>(false);
    const [linechartDataType, setLinechartDataType] = useState<string>('Sum');

    // Donut chart
    const [operationType, setOperationType] = useState<number>(1);
    const [donutChartDropdownVisible, setDonutChartDropdownVisible] = useState<boolean>(false);

    useEffect(() => {
        getUsersWallets(authTokens.accessToken, logout)
            .then((response) => {
                setWallets(response);
                setSelectedWallet(response[0])

                getWalletsTransactions(authTokens.accessToken, response[0].id, logout)
                    .then((response) => {
                        setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
                        setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
                        setTransactions(response)
                        // console.log(response)
                        setRecentTransactions(getRecentTransactionsArray(response));
                    })

                // getWalletsCategories(authTokens.accessToken, response[0].id, logout)
                //     .then((response) => {
                //         console.log('Categories: ')
                //         console.log(response)
                //     })
            })
    }, [])

    useEffect(() => {
        if (selectedWallet) {

            getWalletsTransactionCategories(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => {
                    setTransactionCategories(response);
                })
            // getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
            //     .then((response) => {
            //         setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
            //         setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
            //         setTransactions(response);
            //         setRecentTransactions(getRecentTransactionsArray(response));
            //     })
        }


    }, [selectedWallet])

    return (
        <LoggedInPageContainer>
            {/* TOP SECTION */}
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60'>
                <div className='flex flex-row gap-10 items-center'>
                    <h1 className='font-semibold'>Main Dashboard</h1>
                    <div className='relative'>
                        <button className='flex flex-row justify-center items-center w-48 bg-orange-600 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setWalletsDropdownVisible(!walletsDropdownVisible)}>
                            <span className='overflow-hidden truncate'>{selectedWallet?.name}</span>
                            <BiChevronDown className={`${walletsDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                        </button>
                        <ul className={`${walletsDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-48 transition duration-150 ease-in-out absolute left-0 top-10 backdrop-blur-md bg-orange-600 bg-opacity-20 flex flex-col justify-center items-center rounded-xl gap-2 py-4 px-2`}>
                            {wallets.map((element) =>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => {
                                        setSelectedWallet(element);
                                        setWalletsDropdownVisible(false);
                                    }}>
                                    {element.name}
                                </li>)}
                        </ul>
                    </div>
                </div>

                <div>
                    Date selection
                </div>

                <div>
                    <div className='flex flex-row items-center gap-5'>
                        <span>{user.username}</span>
                        <div className='bg-slate-500 w-10 h-10 rounded-full'></div>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className='main-dashboard-grid grid grid-cols-6 w-full h-full gap-4 text-white'>

                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total funds</span>
                    <h1 className='font-bold text-xl text-opacity-90'>{selectedWallet?.balance} $</h1>
                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total incomes</span>
                    <h1 className='font-bold text-xl text-opacity-90 text-green-700'>+ {incomesTotal.toFixed(2)} $</h1>
                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total expenses</span>
                    <h1 className='font-bold text-xl text-opacity-90 text-red-700'>- {expensesTotal.toFixed(2)} $</h1>
                </div>

                <div className='h-full w-full flex flex-col shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-7 py-5 col-span-3 row-span-4'>
                    <div className='w-ful flex flex-row justify-between items-center mb-4'>
                        <h1 className='font-bold text-xl text-opacity-90'>Recent transactions</h1>
                        <button className='bg-orange-700 bg-opacity-20 hover:bg-opacity-30 transition duration-200 ease-in-out cursor-pointer shadow-md flex flex-row items-center gap-2 w-fit px-4 py-1 rounded-md'>
                            <BiPlus />
                            <span className='font-medium text-sm text-opacity-90'>New Transaction</span>
                        </button>
                    </div>
                    <ul className='flex flex-col h-full gap-2'>
                        {recentTransactions.map(transaction => {
                            return <div className='rounded-sm text-sm bg-orange-600 bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition duration-200 ease-in-out w-full h-10 flex flex-row justify-between items-center gap-4 px-2'>
                                <div className='flex flex-col'>
                                    <span className='w-44 font-medium text-sm truncate text-ellipsis'>{transaction.name} - {transaction.recipient}</span>
                                    <span className='w-44 text-xs truncate text-ellipsis'>{transaction.description}</span>

                                </div>
                                <span className='w-20'>{transactionCategories.find((category) => category.id == transaction.categoryID)?.name}</span>
                                <span className='w-30'>{(moment(transaction.date)).format('DD MMM YYYY')}</span>
                                <span className='w-30'>{(moment(transaction.date)).format('HH:mm')}</span>
                                <span className={`w-20 text-right ${transaction.operationTypeID === 2 ? 'text-green-600 ' : 'text-red-600'}`}>
                                    {transaction.operationTypeID === 2 ? '+ ' : '- '}
                                    {transaction.value}
                                </span>
                            </div>

                        }
                        )}
                    </ul>

                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 col-span-3 row-span-3'>
                    Incomes Vs Expenses
                    <IncomesVsExpensesPlot transactions={transactions} />
                </div>

                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-6 py-4 col-span-4 row-span-4 flex flex-col gap-4'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <p className='text-lg font-semibold'>Transactions over time</p>

                        <div className='relative'>
                            <button className='flex flex-row justify-center items-center w-32 bg-orange-600 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setLineChartDropdownVisible(!lineChartDropdownVisible)}>
                                <span className='overflow-hidden truncate'>{linechartDataType}</span>
                                <BiChevronDown className={`${lineChartDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
                            <ul className={`${lineChartDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-32 transition duration-150 ease-in-out absolute left-0 top-10 backdrop-blur-md bg-orange-600 bg-opacity-20 flex flex-col justify-center items-center rounded-xl gap-2 py-4 px-2`}>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => { setLinechartDataType('Sum'); setLineChartDropdownVisible(false) }}>
                                    Sum
                                </li>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => { setLinechartDataType('Count'); setLineChartDropdownVisible(false) }}>
                                    Count
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-row gap-6'>
                            <input type='month' className='datePicker'
                                value={`${startDate.year()}-${String(startDate.month() + 1).padStart(2, '0')}`}
                                min={`${moment().year() - 1}-${String(moment().month() + 1).padStart(2, '0')}`}
                                max={`${moment().year()}-${String(moment().month() + 1).padStart(2, '0')}`}
                                onChange={(e) => setStartDate(moment(e.target.value))} />

                            <input type='month' className='datePicker' lang='de'
                                value={`${endDate.year()}-${String(endDate.month() + 1).padStart(2, '0')}`}
                                min={`${startDate.year()}-${String(startDate.month() + 1).padStart(2, '0')}`}
                                max={`${moment().year()}-${String(moment().month() + 1).padStart(2, '0')}`}
                                onChange={(e) => setEndDate(moment(e.target.value))} />
                        </div>
                    </div>
                    <div className='w-full h-[90%]'>
                        <IncomesExpensesOverTime transactions={transactions} startDate={startDate} endDate={endDate} dataType={linechartDataType} />
                    </div>
                </div>

                <div className='h-full w-full flex flex-col items-center shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-4 col-span-2 row-span-4 gap-2'>
                    <div className='flex flex-row w-full justify-between'>
                        <p>{operationType === 1 ? 'Expenses' : 'Incomes'} distribution</p>

                        <div className='relative'>
                            <button className='flex flex-row justify-center items-center w-36 bg-orange-600 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setDonutChartDropdownVisible(!donutChartDropdownVisible)}>
                                <span className='overflow-hidden truncate'>{operationType === 1 ? 'Expenses' : 'Incomes'}</span>
                                <BiChevronDown className={`${donutChartDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
                            <ul className={`${donutChartDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-36 transition duration-150 ease-in-out absolute left-0 top-10 backdrop-blur-md bg-orange-600 bg-opacity-20 flex flex-col justify-center items-center rounded-xl gap-2 py-4 px-2`}>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => { setOperationType(1); setDonutChartDropdownVisible(false) }}>
                                    Expenses
                                </li>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => { setOperationType(2); setDonutChartDropdownVisible(false) }}>
                                    Incomes
                                </li>
                            </ul>
                        </div>

                        {/* <button className='bg-orange-600 bg-opacity-20 transition duration-200 ease-in-out shadow-sm hover:bg-opacity-30 text-black text-opacity-50 text-xl px-2 py-1 rounded-md' onClick={(e) => operationType === 1 ? setOperationType(2) : setOperationType(1)}>
                            {operationType === 1 ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
                        </button> */}
                    </div>
                    <div className='h-[90%] w-[90%]'>
                        <TransactionDistribution transactions={transactions} transactionCategories={transactionCategories.filter(category => category.operationTypeId === operationType)} operationType={operationType} />
                    </div>
                </div>

            </div>
        </LoggedInPageContainer>
    )
}

export default Home