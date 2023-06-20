import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import ButtonWithChildren from '../buttons/ButtonWithChildren';
import { TransactionCategoryType } from '../../../data/types/TransactionCategory';
import { AiFillEdit, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import TextInput from './TextInput';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx'
import DeleteCategoryOverlay from '../../overlays/DeleteCategoryOverlay';
import OverlayContainer from '../containers/OverlayContainer';
import OverlayWindowContainer from '../containers/OverlayWindowContainer';
import { NewTransactionCategoryType } from '../../../data/types/NewTransactionCategoryType';
import { ErrorMessagesContext, ErrorMessagesContextType } from '../../../context/ErrorMessages';

type EditableCategoryTableRowProps = {
    categories: TransactionCategoryType[],
    category: TransactionCategoryType,
    handleEdit: (category: TransactionCategoryType) => void,
    handleDelete: (id: number) => void,
    deleteCategory: (id: number) => void,
}

const EditableCategoryTableRow = ({ categories, category, handleEdit, handleDelete, deleteCategory }: EditableCategoryTableRowProps) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [categoryName, setCategoryName] = useState<string>(category.name);
    const [categoryNameError, setCategoryNameError] = useState<string>('');

    const [operationTypeID, setOperationTypeID] = useState<number>(category.operationTypeId);
    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState<boolean>(false);

    const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState<boolean>(false);

    const handleSaveClick = async () => {
        if (operationTypeID !== undefined) {
            let newCategory: TransactionCategoryType = {
                id: category.id,
                name: categoryName,
                walletId: category.walletId,
                operationTypeId: operationTypeID
            }

            if (categories.filter(category => category.name === newCategory.name).length !== 0) {
                setCategoryNameError('Category already exists')
                return
            }

            await handleEdit(newCategory);
            setIsEditMode(false)
        }
    }

    const handleDeleteCategory = () => {
        handleDelete(category.id);
        setIsDeleteOverlayVisible(false)
    }

    return (
        <div className='flex flex-row text-sm w-full justify-between'>
            <div className='w-48'>
                {
                    isEditMode ?
                        <>
                            <TextInput value={categoryName} onChange={setCategoryName} width='w-[9.75rem]' />
                            {categoryNameError !== '' ? <p className='text-red-700 text-sm font-semibold'>{categoryNameError}</p> : <></>}
                        </>
                        :
                        <p>{category.name}</p>
                }
            </div>
            <div>
                {
                    isEditMode ?
                        <div className='flex flex-col justify-center items-start'>
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
                        :
                        <>
                            {category.operationTypeId === 1 ? <p className='text-red-700'>Expense</p> : <p className='text-green-700'>Income</p>}
                        </>
                }
            </div>
            <div className='w-24 flex flex-row justify-end gap-2'>
                {
                    isEditMode ?
                        <ButtonWithChildren onClick={() => handleSaveClick()}>
                            <AiOutlineCheck />
                        </ButtonWithChildren>
                        :
                        <ButtonWithChildren onClick={() => { setIsEditMode(true); setCategoryNameError('') }}>
                            <AiFillEdit />
                        </ButtonWithChildren>
                }

                {
                    isEditMode ?
                        <ButtonWithChildren onClick={() => setIsEditMode(false)}>
                            <RxCross2 />
                        </ButtonWithChildren>
                        :
                        <ButtonWithChildren onClick={() => setIsDeleteOverlayVisible(true)}>
                            <AiOutlineDelete />
                        </ButtonWithChildren>
                }
            </div>

            {isDeleteOverlayVisible ?
                <DeleteCategoryOverlay
                    category={category}
                    setOverlayVisibility={setIsDeleteOverlayVisible}
                    deleteCategory={handleDeleteCategory} />
                :
                <></>}
        </div>
    )
}

export default EditableCategoryTableRow