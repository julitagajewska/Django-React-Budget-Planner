import moment from "moment";
import { NewTransactionCategoryType, NewTransactionType, TransactionCategoryType, TransactionType, UserType } from "../data/types/Index";
import { useContext } from "react";


// User
export const registerUser = async (username: string, email:string, password: string, confirmPassword: string) => {
    var body = {
        username: username,
        email: email,
        password: password,
        password2: confirmPassword
    }

    const response = await fetch(`http://127.0.0.1:8000/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    
    const responseJSON = await response.json();
    console.log(responseJSON)

    if(response.status === 200) {
        return('User registered successfully!')
    } else {
        return responseJSON
    }

}

export const getUserByUsername = async (accessToken: string | null, username: string | null,  handleError: () => void) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    if(response.status === 200) {
        const responseJSON = await response.json();

        let user: UserType = {
            username: responseJSON.username,
            email: responseJSON.email,
            imageSrc: responseJSON.profile_picture
        }

        return user;
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

// Wallets
export const getWalletByID = async (accessToken: string | null, id: number | undefined, handleError: () => void) => {
    const response = await fetch(`http://127.0.0.1:8000/api/wallets/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    
    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const getUsersWallets = async (accessToken: string | null, handleError: () => void) => {
    const response = await fetch('http://127.0.0.1:8000/api/wallets/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    
    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const getWalletsTransactions = async (accessToken: string | null, id: number | undefined, handleError: () => void) => {

    if(id === undefined) return

    const response = await fetch(`http://127.0.0.1:8000/api/wallet/transactions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    
    if(response.status === 200) {
        const responseJSON = await response.json();
        const transactionsArray = responseJSON.map((row: any) => {
            let transaction: TransactionType = {
                id: row.id,
                name: row.name,
                value: row.value,
                description: row.description,
                recipient: row.recipient,
                date: new Date(row.date),
                categoryID: row.category,
                operationTypeID: row.operationType,
                walletID: row.wallet,
            }

            return transaction
        })
        return transactionsArray
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const getWalletsTransactionCategories = async (accessToken: string | null, id: number, handleError: () => void) => {
    const response = await fetch(`http://127.0.0.1:8000/api/wallet/transaction_categories/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

        if(response.status === 200) {
        const responseJSON = await response.json();
        const transactionsArray = responseJSON.map((row: any) => {
            let transactionCategory: TransactionCategoryType = {
                id: row.id,
                name: row.name,
                walletId: row.wallet,
                operationTypeId: row.operationType
            }
            return transactionCategory
        })
        return transactionsArray
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const getWalletsCategories = async (accessToken: string | null, id: number, handleError: () => void) => {
    const response = await fetch(`http://127.0.0.1:8000/api/wallet/categories/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    
    if(response.status === 200) {
        const responseJSON = await response.json();
        // const transactionsArray = responseJSON.map((row: any) => {
        //     let transaction: TransactionType = {
        //         id: row.id,
        //         value: row.value,
        //         description: row.description,
        //         recipient: row.recipient,
        //         date: new Date(row.date),
        //         categoryID: row.category,
        //         transactionTypeID: row.transaction_type,
        //         walletID: row.wallet,

        //     }

        //     return transaction
        // })
        // return transactionsArray

        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

// Transactions
export const createTransaction = async(accessToken: string | null, transaction: NewTransactionType, handleError: () => void) => {

    // var transaction: NewTransactionType = {
    //     name: 'test transaction',
    //     recipient: 'test',
    //     value: '250.00',
    //     description: 'test description',
    //     date: moment().toDate(),
    //     walletID: 1,
    //     categoryID: 2,
    //     operationTypeID: 1
    // }

    const response = await fetch(`http://127.0.0.1:8000/api/transactions/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(transaction)
    })

    const responseJSON = await response.json();

    return responseJSON
}

export const editTransaction = async(accessToken: string | null, transaction: TransactionType, handleError: () => void) => {

    const response = await fetch(`http://127.0.0.1:8000/api/transactions/edit/${transaction.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(transaction)
    })

    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const deleteTransaction = async(accessToken: string | null, id: number, handleError: () => void) => {
        const response = await fetch(`http://127.0.0.1:8000/api/transactions/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    })

    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

// Categories
export const createCategory = async(accessToken: string | null, category: NewTransactionCategoryType, handleError: () => void) => {

    const response = await fetch(`http://127.0.0.1:8000/api/categories/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(category)
    })
    
    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const editCategory = async(accessToken: string | null, category: TransactionCategoryType, handleError: () => void) => {

    let editedCategory = {
        id: category.id,
        name: category.name,
        wallet: category.walletId,
        operationType: category.operationTypeId
    }

    const response = await fetch(`http://127.0.0.1:8000/api/categories/edit/${category.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(editedCategory)
    })

    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.status === 400) {
        return "Category already exists"
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}

export const deleteCategory = async(accessToken: string | null, id: number, handleError: () => void) => {
        const response = await fetch(`http://127.0.0.1:8000/api/categories/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    })

    if(response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON
    }

    if(response.statusText === 'Unauthorized') {
        handleError();
    }
}
