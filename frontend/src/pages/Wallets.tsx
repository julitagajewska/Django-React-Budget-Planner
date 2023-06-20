import React, { useContext, useEffect, useState } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';
import { WalletType } from '../context/WalletContext';
import { getUsersWallets, getWalletsTransactions, getUserByUsername, getUserById, getWalletsCategories, getAllWalletsCategories } from '../services';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

const Wallets = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Wallets");

    const navigate = useNavigate();

    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    const [walletCategories, setWalletCategories] = useState<string[]>([''])

    // User image
    const [userImageSrc, setUserImageSrc] = useState<string | undefined>('');

    const [wallets, setWallets] = useState<WalletType[]>([]);

    useEffect(() => {
        getUsersWallets(authTokens.accessToken, logout)
            .then((response) => {
                setWallets(response);
            })

        getUserByUsername(authTokens.accessToken, user.username, logout)
            .then((response) => {
                console.log(response)
                setUserImageSrc(response?.imageSrc)
            });

        getAllWalletsCategories(authTokens.accessToken, logout).then(response => {
            let categories: string[] = []
            response.forEach((element: any) => categories.push(element['name']))
            setWalletCategories(categories)
        })
    }, [])

    return (
        <LoggedInPageContainer>
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60 w-full'>
                {/* WALLET SELECTION */}
                <div className='flex flex-row gap-10 items-center w-full'>
                    <h1 className='font-semibold'>Wallets</h1>
                </div>
                <div className='w-56 flex flex-row items-center justify-end'>
                    <div className='flex flex-row items-center gap-5 cursor-pointer' onClick={() => navigate('../profile')}>
                        <span>{user.username}</span>
                        {userImageSrc !== undefined && userImageSrc !== '' ? <img className='bg-slate-500 w-10 h-10 rounded-full' src={require(`../assets${userImageSrc}`)} alt="user" /> : <></>}
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-12 grid-rows-6 w-full h-full gap-4'>
                {wallets.map(wallet => {
                    let users: number[] = wallet['users'];
                    let usernames = ''


                    getUserById(authTokens.accessToken, 2, logout).then(response => console.log(response))

                    users.forEach(async user => await getUserById(authTokens.accessToken, user, logout).then(response => usernames = usernames.concat(response)))

                    console.log(usernames)
                    return (
                        <div className='col-span-3 row-span-2 bg-white bg-opacity-20 rounded-md shadow-md'>
                            <h1>{wallet.name}</h1>
                            <p>Balance: {wallet.balance}</p>
                        </div>
                    )
                })}
            </div>
        </LoggedInPageContainer>
    )
}

export default Wallets