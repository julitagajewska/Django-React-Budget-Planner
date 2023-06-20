import React, { useContext, useEffect, useState } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { deleteTransaction, editTransaction, getUserByUsername, getUsersWallets, getWalletByID, getWalletsTransactionCategories, getWalletsTransactions } from '../services';
import { BiChevronDown } from 'react-icons/bi';
import { WalletType } from '../context/WalletContext';
import { getTotalIncomesValue, getIncomes, getTotalExpensesValue, getExpenses, getRecentTransactionsArray } from '../utils/TransactionOperations';
import { TransactionType } from '../data/types/Transactions';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/ui/inputs/TextInput';
import { TransactionCategoryType } from '../data/types/TransactionCategory';
import moment from 'moment';
import { AiOutlineDelete } from 'react-icons/ai';
import ButtonWithChildren from '../components/ui/buttons/ButtonWithChildren';
import CreateTransactionOverlay from '../components/overlays/CreateTransactionOverlay';
import DeleteTransactionOverlay from '../components/overlays/DeleteTransactionOverlay';
import EditTransactionOverlay from '../components/overlays/EditTransactionOverlay';
import ManageCategoriesOverlay from '../components/overlays/ManageCategoriesOverlay';
import TransactionDetailsoverlay from '../components/overlays/TransactionDetailsoverlay';
import { NewTransactionCategoryType } from '../data/types/NewTransactionCategoryType';
import { NewTransactionType } from '../data/types/NewTransactionType';
import { createTransaction, createCategory, editCategory, deleteCategory } from '../services/APIRequests';
import { RxCross1 } from 'react-icons/rx';

const Transactions = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    const navigate = useNavigate();
    setActive("Transactions");

    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    // User image
    const [userImageSrc, setUserImageSrc] = useState<string | undefined>('');

    // Wallet picker
    let baseWallet: WalletType = {
        id: 0,
        name: 'test',
        categories: [],
        owners: [],
        balance: 0
    }

    // Wallets
    const [wallets, setWallets] = useState<WalletType[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<WalletType>();
    const [walletsDropdownVisible, setWalletsDropdownVisible] = useState(false);

    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState(false);
    const [operationType, setOperationType] = useState<number>(0);
    const operationTypes: string[] = ['All', 'Expenses', 'Incomes'];

    // Transactions
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [transactionCategories, setTransactionCategories] = useState<TransactionCategoryType[]>([]);

    // Search
    const [searchInput, setSearchInput] = useState<string>('');

    useEffect(() => {
        getUsersWallets(authTokens.accessToken, logout)
            .then((response) => {
                setWallets(response);

                if (response[0] !== undefined) {
                    setSelectedWallet(response[0])

                    getWalletsTransactions(authTokens.accessToken, response[0].id, logout)
                        .then((response) => setTransactions(response))
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
                    getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                        .then((response) => setTransactions(response))
                })
        }


    }, [selectedWallet])

    useEffect(() => {
        if (searchInput === '' && selectedWallet !== undefined) {
            getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => setTransactions(response))
        }
        setTransactions(transactions.filter(transaction => {
            if (transaction.name.toLowerCase().startsWith(searchInput.toLowerCase()) ||
                transaction.recipient.toLowerCase().startsWith(searchInput.toLowerCase()) ||
                transaction.description.toLowerCase().startsWith(searchInput.toLowerCase())) {
                return transaction
            }
        }))
    }, [searchInput])



    useEffect(() => {
        if (selectedWallet !== undefined) {
            if (operationType === 0) {
                getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                    .then((response) => setTransactions(response))
                return
            }

            getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => {
                    setTransactions(response.filter((transaction: TransactionType) => transaction.operationTypeID === operationType))
                })

        }
    }, [operationType])

    // Transactions details overlay
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

    const [isTransactionDetailsOverlayVisible, setIsTransactionDetailsOverlayVisible] = useState<boolean>(false)
    // Delete transaction overlay
    const [isDeleteTransactionOverlayVisibile, setIsDeleteTransactionOverlayVisibile] = useState<boolean>(false);

    // Create transaction overlay
    const [isCreateTransactionOverlayVisibile, setIsCreateTransactionOverlayVisibile] = useState<boolean>(false);

    // Edit transaction overlay
    const [isEditTransactionOverlayVisibile, setIsEditTransactionOverlayVisibile] = useState<boolean>(false);

    // Edit transaction overlay
    const [isManageCategoriesOverlayVisibile, setIsManageCategoriesOverlayVisibile] = useState<boolean>(false);

    const updateTransactions = () => {
        if (selectedWallet !== undefined) {
            getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => { setTransactions(response) })
        }
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

    const handleCategoryCreate = (category: NewTransactionCategoryType) => {
        createCategory(authTokens.accessToken, category, logout)
            .then((response) => {
                if (selectedWallet !== undefined)
                    getWalletsTransactionCategories(authTokens.accessToken, selectedWallet.id, logout)
                        .then((response) => {
                            setTransactionCategories(response);
                            console.log(transactionCategories)
                        })
            })
    }

    const handleCategoryEdit = async (category: TransactionCategoryType) => {
        editCategory(authTokens.accessToken, category, logout)
            .then((response) => {
                if (response === "Category already exists") {
                    return
                }
                if (selectedWallet !== undefined)
                    getWalletsTransactionCategories(authTokens.accessToken, selectedWallet.id, logout)
                        .then((response) => {
                            setTransactionCategories(response);
                            console.log(transactionCategories)
                        })
            })
    }

    const handleCategoryDelete = (id: number) => {
        deleteCategory(authTokens.accessToken, id, logout)
            .then((response) => {
                if (selectedWallet !== undefined)
                    getWalletsTransactionCategories(authTokens.accessToken, selectedWallet.id, logout)
                        .then((response) => {
                            setTransactionCategories(response);
                        })
            })
    }

    return (
        <LoggedInPageContainer>
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60 w-full'>
                {/* WALLET SELECTION */}
                <div className='flex flex-row gap-10 items-center w-full'>
                    <h1 className='font-semibold'>Transactions</h1>
                    <div className='relative text-sm'>
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
                    <div className='relative text-sm'>
                        <button className='flex flex-row justify-center items-center w-36 bg-orange-600 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setOperationTypeDropdownVisible(!operationTypeDropdownVisible)}>
                            <span className='overflow-hidden truncate'>{operationTypes[operationType]}</span>
                            <BiChevronDown className={`${operationTypeDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                        </button>
                        <ul className={`${operationTypeDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-36 transition duration-150 ease-in-out absolute left-0 top-10 backdrop-blur-md bg-orange-600 bg-opacity-20 flex flex-col justify-center items-center rounded-xl gap-2 py-4 px-2`}>
                            {operationTypes.map((type, i) =>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-600 bg-opacity-0 hover:bg-opacity-10 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => { setOperationType(i); console.log(i); setOperationTypeDropdownVisible(false) }}>
                                    {type}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='w-full'>
                        <TextInput value={searchInput} onChange={setSearchInput} width='w-full' placeholder='Search transactions ...' dark={true} />
                    </div>
                </div>
                <div className='w-56 flex flex-row items-center justify-end'>
                    <div className='flex flex-row items-center gap-5 cursor-pointer' onClick={() => navigate('../profile')}>
                        <span>{user.username}</span>
                        {userImageSrc !== undefined && userImageSrc !== '' ? <img className='bg-slate-500 w-10 h-10 rounded-full' src={require(`../assets${userImageSrc}`)} alt="user" /> : <></>}
                    </div>
                </div>
            </div>

            {/* TABLE HEADER */}
            <div className='w-full h-full flex flex-col gap-0'>
                <div className='w-full h-10 bg-white bg-opacity-10 px-4 rounded-md shadow-md flex text-black text-opacity-75 flex-row justify-start items-center'>
                    <p className='w-8'>#</p>
                    <p className='w-48'>Name</p>
                    <p className='w-48'>Recipient</p>
                    <p className='w-64'>Description</p>
                    <p className='w-36'>Category</p>
                    <p className='w-36'>Date</p>
                    <p className='w-[10%]'>Time</p>
                    <p className='w-[10%]'>Value</p>
                    <p className='w-12'>Action</p>
                </div>

                {/* TABLE */}

                <div className='bg-white bg-opacity-10 rounded-md shadow-md w-full h-full overflow-auto max-h-[37rem] mt-4 px-2 py-2  gap-4'>
                    {transactions.map((transaction, i) => {
                        let category = transactionCategories.filter(category => category.id === transaction.categoryID)
                        return (
                            <div className='w-full h-10 mb-2 transition duration-200 ease-in-out cursor-pointer hover:bg-orange-600 hover:bg-opacity-5 px-2 rounded-md hover:shadow-md flex text-black text-opacity-75 flex-1 overflow-auto justify-start items-center' onClick={() => {
                                setSelectedTransaction(transaction);
                                setIsEditTransactionOverlayVisibile(true);
                            }}>
                                <p className='w-8'>{i + 1}</p>
                                <p className='w-48'>{transaction.name}</p>
                                <p className='w-48'>{transaction.recipient}</p>
                                <p className='w-64'>{transaction.description}</p>
                                <p className='w-36'>{category.length !== 0 ? category[0].name : '-'}</p>
                                <p className='w-36'>{moment(transaction.date).format('DD MMM YYYY')}</p>
                                <p className='w-[10%]'>{moment(transaction.date).format('HH:mm')}</p>
                                <p className={`w-[10%] ${transaction.operationTypeID === 1 ? 'text-red-600' : 'text-green-600'}`}>{transaction.operationTypeID === 1 ? '- ' : '+ '}{transaction.value}</p>
                                <p className='w-10 text-center'>
                                    <ButtonWithChildren onClick={() => { setSelectedTransaction(transaction); setIsDeleteTransactionOverlayVisibile(true) }}>
                                        <RxCross1 />
                                    </ButtonWithChildren>
                                </p>
                            </div>
                        )
                    }
                    )}
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
                        setManageCategoriesOverlayVisibility={setIsManageCategoriesOverlayVisibile}
                        setOverlayVisibility={setIsCreateTransactionOverlayVisibile}
                        categories={transactionCategories}
                        handleCreateTransaction={handleCreateTransaction}
                        walletID={selectedWallet?.id} />

                    :
                    <></>
                }

                {isEditTransactionOverlayVisibile ?
                    <EditTransactionOverlay
                        setManageCategoriesOverlayVisibility={setIsManageCategoriesOverlayVisibile}
                        categories={transactionCategories}
                        setVisibility={setIsEditTransactionOverlayVisibile}
                        setDetailsOverlayVisibility={setIsTransactionDetailsOverlayVisible}
                        handleEdit={handleEditTransaction}
                        transaction={selectedTransaction} />
                    :
                    <></>
                }

                {isManageCategoriesOverlayVisibile ?
                    <ManageCategoriesOverlay
                        selectedWallet={selectedWallet}
                        handleCategoryCreate={handleCategoryCreate}
                        handleCategoryEdit={handleCategoryEdit}
                        handleCategoryDelete={handleCategoryDelete}
                        categories={transactionCategories}
                        setVisibility={setIsManageCategoriesOverlayVisibile} />
                    :
                    <></>
                }
            </div>
        </LoggedInPageContainer>
    )
}

export default Transactions