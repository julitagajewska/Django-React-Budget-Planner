import React, { useContext } from 'react'
import { Link } from 'react-scroll'
import NavigationLink from './ui/NavigationLink'
import { AuthContext, AuthContextType } from '../context/AuthContext'
import HoverableButtonSmall from './ui/buttons/HoverableButtonSmall'
import { useNavigate } from 'react-router-dom'

type NavbarProps = {
    isLanding: boolean
}

const Navbar = () => {

    const { authTokens, logout } = useContext(AuthContext) as AuthContextType;

    const navigate = useNavigate();

    return (
        <div className='w-full h-10 flex flex-row justify-between items-center px-32 py-10'>
            <div>
                <NavigationLink text='BudgetPlanner' to='' />
            </div>

            <div>
                <NavigationLink text='Home' to='home' />
                <NavigationLink text='Features' to='features' />
                <NavigationLink text='About' to='about' />
                <NavigationLink text='Register' to='register' />

                <HoverableButtonSmall text='Log in' onClick={() => navigate('login')} />
            </div>
        </div>
    )
}

export default Navbar