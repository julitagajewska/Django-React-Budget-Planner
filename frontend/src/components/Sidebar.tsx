import React, { PropsWithChildren, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, AuthContextType } from '../context/AuthContext';
import SidebarLink from './ui/SidebarLink';

import { HiOutlineDocumentReport } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { BiTransfer, BiUser, BiWallet, BiLogOut } from 'react-icons/bi';
import { FaWallet } from 'react-icons/fa'

const Sidebar = ({ children }: PropsWithChildren) => {

    const { logout } = useContext(AuthContext) as AuthContextType;

    return (
        // <div className='bg-sky-700 fixed top-0 left-0 h-screen w-60 flex flex-col justify-between px-10 py-10'>
        <div className='bg-orange-700 bg-opacity-30 shadow-xl h-screen w-60 flex flex-col justify-between px-10 py-8'>
            <div>
                <Link to="../home" className='text-white font-medium'>BudgetPlanner</Link>
            </div>
            <div className='flex flex-col'>
                <SidebarLink to='/' text="Dashboard" icon={<RxDashboard />} />
                <SidebarLink to='/transactions' text="Transactions" icon={<BiTransfer />} />
                <SidebarLink to='/wallets' text="Wallets" icon={<BiWallet />} />
                <SidebarLink to='/reports' text='Reports' icon={<HiOutlineDocumentReport />} />
                <SidebarLink to='/profile' text='Profile' icon={<BiUser />} />
            </div>

            <div className='flex flex-col items-start'>
                <button onClick={() => logout()} className='flex flex-row gap-4 items-center w-full text-white text-opacity-75 hover:text-opacity-100 transition duration ease-in-out'><BiLogOut />Log out</button>
            </div>
        </div>
    )
}

export default Sidebar