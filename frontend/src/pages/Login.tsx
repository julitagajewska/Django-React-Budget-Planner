import React, { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, AuthContextType } from '../context/AuthContext'

import PageContainer from '../layout/PageContainer'
import ContentCentered from '../layout/ContentCentered'
import FormContainer from '../components/form/FormContainer'
import FormInput from '../components/form/FormInput'

import { FaUser, FaAt, FaLock, FaKey } from 'react-icons/fa';
import Footer from '../components/Footer'

const Login = () => {

    const { loginUser, errorMessage, setErrorMessage } = useContext(AuthContext) as AuthContextType;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setErrorMessage('')
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        await loginUser(e, username, password)
    }

    return (
        <>
            <PageContainer>
                <ContentCentered>
                    <FormContainer>

                        <div className='flex flex-col justify-center items-center text-white'>
                            <h1 className='text-2xl font-light'>Welcome back</h1>
                            <h3 className='text-base font-thin opacity-60 pt-1'>Let's do some budgeting</h3>
                            <span className='text-red-600 text-sm font-semibold pt-4 w-52 text-center'>{errorMessage}</span>
                        </div>

                        <form className='flex flex-col justify-center gap-3 items-center' onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                            <FormInput type="text" placeholder="Username" icon={<FaUser />} onChange={setUsername} />

                            <FormInput
                                type="password"
                                placeholder="Password" icon={<FaKey />}
                                onChange={setPassword} />

                            <div className='mt-3'>
                                <button className='px-10 py-1 bg-white bg-opacity-20 shadow-md hover:bg-blue-500 hover:bg-opacity-80 transition duration-200 ease-in-out rounded-full text-white' type='submit' >Log in</button>
                            </div>
                        </form>

                        <div className='text-sm text-white font-thin'>
                            <span>Don't have an account?</span>
                            <Link to='../register' className='underline pl-2'>Register</Link>
                        </div>

                    </FormContainer>
                </ContentCentered>
            </PageContainer>
            <Footer />
        </>
    )
}

export default Login