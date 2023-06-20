import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import OverlayContainer from '../ui/containers/OverlayContainer'
import { RxCross2 } from 'react-icons/rx'
import ButtonWithChildren from '../ui/buttons/ButtonWithChildren'
import TextButton from '../ui/buttons/TextButton'
import OverlayWindowContainer from '../ui/containers/OverlayWindowContainer'
import { CategoryType } from '../../data/types/Category'
import { TransactionCategoryType } from '../../data/types/TransactionCategory'
import TextInput from '../ui/inputs/TextInput'
import SelectionInput from '../ui/inputs/SelectionInput'
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import EditableCategoryTableRow from '../ui/inputs/EditableCategoryTableRow'
import DeleteCategoryOverlay from './DeleteCategoryOverlay'
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../context/ErrorMessages'
import { NewTransactionCategoryType } from '../../data/types/NewTransactionCategoryType'
import { WalletType } from '../../context/WalletContext'

type ManageCategoriesOverlayProps = {
    setVisibility: Dispatch<SetStateAction<boolean>>,
    categories: TransactionCategoryType[],
    handleCategoryCreate: (category: NewTransactionCategoryType) => void
    handleCategoryEdit: (category: TransactionCategoryType) => void,
    handleCategoryDelete: (id: number) => void,
    selectedWallet: WalletType | undefined
}

const ManageCategoriesOverlay = ({ setVisibility, selectedWallet, categories, handleCategoryCreate, handleCategoryEdit, handleCategoryDelete }: ManageCategoriesOverlayProps) => {

    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [newCategoryNameError, setNewCategoryNameError] = useState<string>('');

    const [operationTypeID, setOperationTypeID] = useState<number>(1);
    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState<boolean>(false);

    const handleAddCategory = () => {
        if (selectedWallet !== undefined) {
            if (newCategoryName === '') {
                setNewCategoryNameError('Name is required')
                return
            }
            if (categories.filter(category => category.name === newCategoryName).length !== 0) {
                setNewCategoryNameError('Category already exists')
                return
            }

            setNewCategoryNameError('')

            let newCategory: NewTransactionCategoryType = {
                name: newCategoryName,
                wallet: selectedWallet.id,
                operationType: operationTypeID
            }

            if (newCategoryNameError === '') {
                handleCategoryCreate(newCategory)
            }
        }
    }

    const handleExit = () => {

        setVisibility(false);

    }

    return (
        <OverlayContainer>
            <OverlayWindowContainer>

                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-black font-bold opacity-75'>Manage categories</p>
                    </div>
                    <div>
                        <ButtonWithChildren onClick={handleExit}>
                            <RxCross2 />
                        </ButtonWithChildren>
                    </div>
                </div>

                <div className='flex flex-row justify-between items-end gap-4'>
                    <div className='flex flex-col relative'>
                        <p className='opacity-50 text-sm'>New category name</p>
                        <TextInput width='w-[9.75rem]' value={newCategoryName} onChange={setNewCategoryName} placeholder='New category ...' />
                        {newCategoryNameError !== '' ? <p className='absolute top-[3.25rem] w-fit text-red-700 text-sm font-semibold'>{newCategoryNameError}</p> : <></>}
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Operation type</p>
                        <div className='relative'>
                            <button className='flex flex-row justify-center items-center text-sm w-36 bg-orange-100 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setOperationTypeDropdownVisible(!operationTypeDropdownVisible)}>
                                <span className='overflow-hidden truncate'>{operationTypeID === 1 ? 'Expense' : 'Income'}</span>
                                <BiChevronDown className={`${operationTypeDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
                            <ul className={`${operationTypeDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-36 transition duration-150 ease-in-out absolute left-0 top-10 z-20 dropdown-background bg-orange-100 bg-opacity-50 flex flex-col justify-center items-center rounded-xl gap-2 py-2 px-2`}>
                                <div className='absolute w-full h-full z-30 bg-white bg-opacity-10'>
                                </div>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 z-40 bg-opacity-0 hover:bg-opacity-30 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => {
                                        setOperationTypeID(1);
                                        setOperationTypeDropdownVisible(false);
                                    }}>
                                    Expense
                                </li>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 bg-opacity-0 z-40 hover:bg-opacity-30 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => {
                                        setOperationTypeID(2);
                                        setOperationTypeDropdownVisible(false);
                                    }}>
                                    Income
                                </li>
                            </ul>
                        </div>
                    </div>


                    <ButtonWithChildren onClick={handleAddCategory}>
                        <BiPlus />
                    </ButtonWithChildren>

                </div>

                {/* TABLE HEADER */}
                <div className='flex flex-col gap-2 pt-4'>
                    <div className='flex flex-row text-sm w-full justify-between'>
                        <div className='w-48'>
                            <p>Category name</p>
                        </div>
                        <div>
                            <p>Operation type</p>
                        </div>
                        <div className='w-24 text-right pr-4'>
                            <p>Action</p>
                        </div>
                    </div>
                    <div className='w-full bg-black h-[1px] opacity-10'></div>
                </div>

                <div className='flex flex-col gap-2 h-64 overflow-y-auto'>
                    {categories.map(category =>
                        <EditableCategoryTableRow
                            categories={categories}
                            category={category}
                            handleEdit={handleCategoryEdit}
                            handleDelete={handleCategoryDelete}
                            deleteCategory={handleCategoryDelete} />
                    )}
                </div>
            </OverlayWindowContainer>
        </OverlayContainer>
    )
}

export default ManageCategoriesOverlay