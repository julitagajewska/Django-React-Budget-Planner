import React, { ChangeEvent, useState } from 'react'
import PageContainer from '../layout/PageContainer'
import Footer from '../components/Footer'
import ContentCentered from '../layout/ContentCentered'
import FormContainer from '../components/form/FormContainer'
import FormInput from '../components/form/FormInput'

import { FaUser, FaAt, FaLock, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../libs/axios'
import { registerUser } from '../services'
import { error } from 'console'

const Register = () => {

    const navigate = useNavigate();
    // const initialFormData = Object.freeze({
    //     username: '',
    //     email: '',
    //     password: '',
    //     passwordConfirm: ''
    // })

    // const [formData, setFormData] = useState(initialFormData);

    const [username, setUsername] = useState('');
    const [usernameErrors, setUsernameErrors] = useState<string[]>();

    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState<string[]>();

    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>();

    const [confimrPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>();

    const [message, setMessage] = useState<string>();


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setFormData({...formData, [e.target.name]: e.target.value.trim()})
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        registerUser(username, email, password, confimrPassword)
            .then((response) => {
                if (response === "User registered successfully!") {
                    setMessage("User registered successfully!")
                    setUsernameErrors([''])
                    setEmailErrors([''])
                    setPasswordErrors([''])
                    setConfirmPasswordErrors([''])
                } else {
                    setUsernameErrors(response['username'])
                    setEmailErrors(response['email'])
                    setPasswordErrors(response['password'])
                    setConfirmPasswordErrors(response['password2'])
                }
            })
    }



    return (
        <>
            <PageContainer>
                <ContentCentered>
                    <FormContainer>
                        <div className='flex flex-col justify-center items-center text-white'>
                            <h1 className='text-lg font-normal'>Welcome</h1>
                            <h3 className='text-sm font-thin opacity-75'>Let's do some budgeting</h3>
                        </div>

                        <FormInput type="text" placeholder="Username" icon={<FaUser />} onChange={setUsername} />
                        {usernameErrors?.map((error) => <span className='text-red-700 text-sm font-bold w-60 text-center'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>)}

                        <FormInput type="text" placeholder="E-mail" icon={<FaAt />} onChange={setEmail} />
                        {emailErrors?.map((error) => <span className='text-red-700 text-sm font-bold w-60 text-center'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>)}

                        <FormInput type="password" placeholder="Password" icon={<FaKey />} onChange={setPassword} />
                        {passwordErrors?.map((error) => <span className='text-red-700 text-sm font-bold w-60 text-center'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>)}

                        <FormInput type="password" placeholder="Confirm password" icon={<FaLock />} onChange={setConfirmPassword} />
                        {confirmPasswordErrors?.map((error) => <span className='text-red-700 text-sm font-bold w-60 text-center'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>)}

                        <div>
                            <button className='px-10 py-1 bg-white bg-opacity-20 shadow-md hover:bg-blue-500 hover:bg-opacity-80 transition duration-200 ease-in-out rounded-full text-white' onClick={(e) => handleSubmit(e)}>Register</button>
                        </div>

                        <span className='text-[#438c1c] opacity-75 text-sm font-semibold w-60 text-center'>{message}</span>

                        <div className='text-sm text-white font-thin'>
                            <span>Already have an account?</span>
                            <Link to='../login' className='underline pl-2'>Log in</Link>
                        </div>
                    </FormContainer>
                </ContentCentered>
            </PageContainer>
            <Footer />
        </>
    )
}

export default Register