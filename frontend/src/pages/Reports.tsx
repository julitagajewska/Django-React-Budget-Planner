import React, { useContext, useEffect, useState } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { getUsersWallets, getWalletsTransactions, getUserByUsername } from '../services';

const Reports = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Reports");

    const navigate = useNavigate();

    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    // User image
    const [userImageSrc, setUserImageSrc] = useState<string | undefined>('');

    useEffect(() => {
        getUserByUsername(authTokens.accessToken, user.username, logout)
            .then((response) => {
                setUserImageSrc(response?.imageSrc)
            });
    }, [])

    return (
        <LoggedInPageContainer>
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60 w-full'>
                {/* WALLET SELECTION */}
                <div className='flex flex-row gap-10 items-center w-full'>
                    <h1 className='font-semibold'>Reports</h1>
                </div>
                <div className='w-56 flex flex-row items-center justify-end'>
                    <div className='flex flex-row items-center gap-5 cursor-pointer' onClick={() => navigate('../profile')}>
                        <span>{user.username}</span>
                        {userImageSrc !== undefined && userImageSrc !== '' ? <img className='bg-slate-500 w-10 h-10 rounded-full' src={require(`../assets${userImageSrc}`)} alt="user" /> : <></>}
                    </div>
                </div>
            </div>

            <div className='w-full h-full flex flex-col justify-center items-center'>
                <img src="https://media.tenor.com/v7Z6_aeZ1ocAAAAC/patrick-star-idk.gif" alt="Patrick with a hammer" />
                <p className='pt-4 italic'>Work in progress ...</p>
            </div>
        </LoggedInPageContainer>
    )
}

export default Reports