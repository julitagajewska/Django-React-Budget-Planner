import React, { Dispatch, SetStateAction } from 'react';

type DeleteTransactionOverlayProps = {
    setOverlayVisibility: Dispatch<SetStateAction<boolean>>,
    deleteTransaction: () => void
}

const DeleteTransactionOverlay = ({ setOverlayVisibility, deleteTransaction }: DeleteTransactionOverlayProps) => {

    const handleReturn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setOverlayVisibility(false)
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        deleteTransaction()
    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-md flex flex-col justify-center items-center text-black'>

            <div className='overlay-container py-6 px-9 rounded-lg shadow-lg flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-lg font-bold'>Are You sure?</h1>
                    <p className='text-base'>Do You want to permanently remove the transaction?</p>
                    <p className='text-sm text-red-800 font-bold'>This action is irrevrsible!</p>
                </div>

                <div className='flex flex-row gap-6 my-4'>
                    <button className='bg-orange-600 text-black text-opacity-50 font-medium hover:text-opacity-80 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out' onClick={(e) => handleReturn(e)}>Return</button>
                    <button className='bg-orange-600 text-black text-opacity-50 font-medium hover:text-opacity-80 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out' onClick={(e) => handleDelete(e)}>Delete</button>
                </div>
            </div>


        </div>
    )
}

export default DeleteTransactionOverlay