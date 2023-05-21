import React, { ChangeEvent, FormEvent, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, AuthContextType } from '../context/AuthContext'

import PageContainer from '../layout/PageContainer'
import ContentCentered from '../layout/ContentCentered'
import FormContainer from '../components/form/FormContainer'
import FormInput from '../components/form/FormInput'

import { FaUser, FaAt, FaLock, FaKey } from 'react-icons/fa';

const Login = () => {

    const { loginUser } = useContext(AuthContext) as AuthContextType;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        await loginUser(e, username, password);
    }

    return (
        <PageContainer>
            <ContentCentered>
                <FormContainer>

                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-lg font-semibold'>Welcome back</h1>
                        <h3 className='text-sm font-normal'>Let's do some budgeting</h3>
                    </div>

                    <form className='flex flex-col justify-center gap-3 items-center' onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                        <FormInput type="text" placeholder="Username" icon={<FaUser />} onChange={setUsername} />

                        <FormInput
                            type="password"
                            placeholder="Password" icon={<FaKey />}
                            onChange={setPassword} />

                        <div className='mt-3'>
                            <button className='px-8 py-1 bg-slate-600 rounded-full text-white' type='submit' >Log in</button>
                        </div>
                    </form>

                    <div className='text-sm'>
                        <span>Don't have an account?</span>
                        <Link to='register' className='underline pl-2'>Register</Link>
                    </div>

                </FormContainer>
            </ContentCentered>
        </PageContainer>
    )
}

export default Login