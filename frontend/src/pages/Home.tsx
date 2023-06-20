import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { getUserByUsername, getUsersWallets, getWalletsTransactionCategories, getWalletsTransactions } from '../services';
import LoggedInPageContainer from '../layout/LoggedInPageContainer';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { WalletType } from '../context/WalletContext';
import moment, { Moment } from 'moment';
import { getExpenses, getIncomes, getRecentTransactionsArray, getTotalExpensesValue, getTotalIncomesValue } from '../utils/Index';
import TransactionDistribution from '../components/graphs/TransactionDistribution';
import { TransactionCategoryType, TransactionType, CategoryType, NewTransactionType } from '../data/types/Index';
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import IncomesExpensesOverTime from '../components/graphs/IncomesExpensesOverTime';
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';
import TransactionDetailsoverlay from '../components/overlays/TransactionDetailsoverlay';
import { createTransaction, deleteTransaction, editTransaction, getWalletByID } from '../services/APIRequests';
import DeleteTransactionOverlay from '../components/overlays/DeleteTransactionOverlay';
import CreateTransactionOverlay from '../components/overlays/CreateTransactionOverlay';
import EditTransactionOverlay from '../components/overlays/EditTransactionOverlay';

const Home = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Dashboard");

    // User context
    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    // Wallet picker
    let baseWallet: WalletType = {
        id: 0,
        name: 'test',
        categories: [],
        owners: [],
        balance: 0
    }
    const [wallets, setWallets] = useState<WalletType[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<WalletType>();
    const [walletsDropdownVisible, setWalletsDropdownVisible] = useState(false);


    // Transactions
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<TransactionType[]>([])
    const [transactionCategories, setTransactionCategories] = useState<TransactionCategoryType[]>([]);

    // Counters
    const [incomesTotal, setIncomesTotal] = useState<number>(0);
    const [expensesTotal, setExpensesTotal] = useState<number>(0);

    // Line chart
    const [startDate, setStartDate] = useState<Moment>(moment('2023-01'));
    const [endDate, setEndDate] = useState<Moment>(moment('2023-06'));
    const [lineChartDropdownVisible, setLineChartDropdownVisible] = useState<boolean>(false);
    const [linechartDataType, setLinechartDataType] = useState<string>('Sum');

    // Donut chart
    const [operationType, setOperationType] = useState<number>(1);
    const [donutChartDropdownVisible, setDonutChartDropdownVisible] = useState<boolean>(false);

    // User image
    const [userImageSrc, setUserImageSrc] = useState<string | undefined>('');

    // Transactions details overlay
    const [isTransactionDetailsOverlayVisible, setIsTransactionDetailsOverlayVisible] = useState<boolean>(false)
    let baseTransaction: TransactionType = {
        id: 0,
        name: 'test',
        value: '0',
        description: '',
        recipient: '',
        date: moment().toDate(),
        walletID: 1,
        categoryID: 1,
        operationTypeID: 1
    }
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>(baseTransaction)

    // Delete transaction overlay
    const [isDeleteTransactionOverlayVisibile, setIsDeleteTransactionOverlayVisibile] = useState<boolean>(false);

    // Create transaction overlay
    const [isCreateTransactionOverlayVisibile, setIsCreateTransactionOverlayVisibile] = useState<boolean>(false);

    // Edit transaction overlay
    const [isEditTransactionOverlayVisibile, setIsEditTransactionOverlayVisibile] = useState<boolean>(false);

    // Edit transaction overlay
    const [isManageCategoriesOverlayVisibile, setIsManageCategoriesOverlayVisibile] = useState<boolean>(false);

    useEffect(() => {
        getUsersWallets(authTokens.accessToken, logout)
            .then((response) => {
                setWallets(response);

                if (response[0] !== undefined) {
                    setSelectedWallet(response[0])

                    getWalletsTransactions(authTokens.accessToken, response[0].id, logout)
                        .then((response) => {
                            setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
                            setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
                            setTransactions(response)
                            setRecentTransactions(getRecentTransactionsArray(response));
                        })
                }
            })

        getUserByUsername(authTokens.accessToken, user.username, logout)
            .then((response) => {
                console.log(response)
                setUserImageSrc(response?.imageSrc)
            });
    }, [])

    useEffect(() => {
        if (selectedWallet) {

            getWalletsTransactionCategories(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => {
                    setTransactionCategories(response);
                })
        }


    }, [selectedWallet])

    const updateTransactions = () => {
        if (selectedWallet !== undefined)
            getUsersWallets(authTokens.accessToken, logout)
                .then((response) => {
                    setWallets(response);

                    if (response[0] !== undefined) {
                        setSelectedWallet(response[0])

                        getWalletsTransactions(authTokens.accessToken, response[0].id, logout)
                            .then((response) => {
                                setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
                                setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
                                setTransactions(response)
                                setRecentTransactions(getRecentTransactionsArray(response));
                            })
                    }
                })
    }

    const handleCreateTransaction = (transaction: NewTransactionType) => {
        createTransaction(authTokens.accessToken, transaction, logout).then((response) => {
            updateTransactions();
        });
    }

    const handleEditTransaction = (transaction: TransactionType) => {
        editTransaction(authTokens.accessToken, transaction, logout).then((response) => {
            setSelectedTransaction(transaction);
            getWalletByID(authTokens.accessToken, selectedWallet?.id, logout).then((response) => {
                console.log(response)
            })
            updateTransactions();
        })
    }

    const handleDeleteTransaction = () => {
        deleteTransaction(authTokens.accessToken, selectedTransaction.id, logout).then((response) => {
            setSelectedTransaction(baseTransaction);
            setIsTransactionDetailsOverlayVisible(false);
            setIsDeleteTransactionOverlayVisibile(false);
            updateTransactions();
        })
    }

    return (
        <LoggedInPageContainer>
            {/* TOP SECTION */}
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60'>

                {/* WALLET SELECTION */}
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

                {/* COUNTERS */}
                <div className='flex flex-row justify-between items-center gap-6'>
                    <div className='h-12 w-44 shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-3 py-2 flex flex-col justify-center'>
                        <span className='text-xs'>Total funds</span>
                        <h1 className='font-extrabold text-sm text-opacity-90'>{selectedWallet?.balance} $</h1>
                    </div>
                    <div className='h-12 w-44 shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-3 py-2 flex flex-col justify-center'>
                        <span className='text-xs'>Total incomes</span>
                        <h1 className='font-extrabold text-sm text-opacity-90 text-green-700'>+ {incomesTotal.toFixed(2)} $</h1>
                    </div>
                    <div className='h-12 w-44 shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-3 flex flex-col justify-center items'>
                        <span className='text-xs'>Total expenses</span>
                        <h1 className='font-extrabold text-sm text-opacity-90 text-red-700'>- {expensesTotal.toFixed(2)} $</h1>
                    </div>
                </div>

                {/* USER */}
                <div>
                    <div className='flex flex-row items-center gap-5'>
                        <span>{user.username}</span>
                        {userImageSrc !== undefined && userImageSrc !== '' ? <img className='bg-slate-500 w-10 h-10 rounded-full' src={require(`../assets${userImageSrc}`)} alt="user" /> : <></>}
                    </div>
                </div>
            </div>


            {/* GRID */}

            {/* TRANSACTIONS TABLE */}
            <div className='main-dashboard-grid grid grid-cols-6 w-full h-full gap-4 text-white'>
                <div className='h-full w-full flex flex-col shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-7 py-5 col-span-4 row-span-4'>
                    <div className='w-ful flex flex-row justify-between items-center mb-4'>
                        <h1 className='font-bold text-lg text-opacity-90'>Recent transactions</h1>
                        <button className='bg-orange-600 bg-opacity-20 hover:bg-opacity-30 transition duration-200 ease-in-out cursor-pointer shadow-md flex flex-row items-center gap-2 w-fit px-4 py-1 rounded-md' onClick={(e) => setIsCreateTransactionOverlayVisibile(true)}>
                            <BiPlus />
                            <span className='font-medium text-opacity-90'>New Transaction</span>
                        </button>
                    </div>
                    <ul className='flex flex-col h-full gap-2'>
                        {recentTransactions.map(transaction => {
                            return (
                                <div className='rounded-sm text-sm bg-orange-600 bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition duration-200 ease-in-out w-full h-10 flex flex-row justify-between items-center gap-4 px-2' onClick={(e) => {
                                    setIsTransactionDetailsOverlayVisible(true);
                                    setSelectedTransaction(transaction)
                                }}>

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
                                </div>)

                        })}
                    </ul>

                </div>

                {/* TRANSACTION CATEGORIES DISTRIBUTION */}
                <div className='h-full w-full flex flex-col items-center shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 pt-5 pb-1 col-span-2 row-span-4 gap-2'>
                    <div className='flex flex-row w-full justify-between'>
                        <h1 className='font-bold text-lg text-opacity-90'>{operationType === 1 ? 'Expenses' : 'Incomes'} distribution</h1>

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
                    </div>
                    <div className='h-[95%] w-[90%]'>
                        <TransactionDistribution transactions={transactions} transactionCategories={transactionCategories.filter(category => category.operationTypeId === operationType)} operationType={operationType} />
                    </div>
                </div>

                {/* TRANSACTIONS OVER TIME */}
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-6 py-4 col-span-6 row-span-4 flex flex-col gap-4'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <h1 className='font-bold text-lg text-opacity-90'>Transactions over time</h1>

                        <div className='flex flex-row gap-5'>
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
                            <input type='month' className='datePicker'
                                value={`${startDate.year()}-${String(startDate.month() + 1).padStart(2, '0')}`}
                                min={`${moment().year() - 2}-${String(moment().month() + 1).padStart(2, '0')}`}
                                max={`${endDate.year()}-${String(endDate.month() + 1).padStart(2, '0')}`}
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

                {isTransactionDetailsOverlayVisible ?
                    <TransactionDetailsoverlay
                        transaction={selectedTransaction}
                        categories={transactionCategories}
                        setVisibility={setIsTransactionDetailsOverlayVisible}
                        setDeleteOverlayVisibility={setIsDeleteTransactionOverlayVisibile}
                        setEditOverlayVisibility={setIsEditTransactionOverlayVisibile} />
                    :
                    <></>
                }

                {isDeleteTransactionOverlayVisibile ?
                    <DeleteTransactionOverlay
                        setOverlayVisibility={setIsDeleteTransactionOverlayVisibile}
                        deleteTransaction={handleDeleteTransaction} />

                    :
                    <></>
                }

                {isCreateTransactionOverlayVisibile ?
                    <CreateTransactionOverlay
                        setOverlayVisibility={setIsCreateTransactionOverlayVisibile}
                        categories={transactionCategories}
                        handleCreateTransaction={handleCreateTransaction}
                        walletID={selectedWallet?.id} />

                    :
                    <></>
                }

                {isEditTransactionOverlayVisibile ?
                    <EditTransactionOverlay
                        categories={transactionCategories}
                        setVisibility={setIsEditTransactionOverlayVisibile}
                        setDetailsOverlayVisibility={setIsTransactionDetailsOverlayVisible}
                        handleEdit={handleEditTransaction}
                        transaction={selectedTransaction} />
                    :
                    <></>
                }

                {isManageCategoriesOverlayVisibile ?
                    <EditTransactionOverlay
                        categories={transactionCategories}
                        setVisibility={setIsEditTransactionOverlayVisibile}
                        setDetailsOverlayVisibility={setIsTransactionDetailsOverlayVisible}
                        handleEdit={handleEditTransaction}
                        transaction={selectedTransaction} />
                    :
                    <></>
                }
            </div>
        </LoggedInPageContainer>
    )
}

export default Home