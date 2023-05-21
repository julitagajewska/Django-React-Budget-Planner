import React, { ChangeEvent, useState } from 'react'
import PageContainer from '../layout/PageContainer'
import Footer from '../components/Footer'
import ContentCentered from '../layout/ContentCentered'
import FormContainer from '../components/form/FormContainer'
import FormInput from '../components/form/FormInput'

import { FaUser, FaAt, FaLock, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../libs/axios'

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confimrPassword, setConfirmPassword] = useState('');

    // const [username, setUsername] = useState('');
    // const [mail, setMail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setFormData({...formData, [e.target.name]: e.target.value.trim()})
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        axiosInstance
            .post('user/create/', {
                email: email,
                username: username,
                password: password
            })
            .then((res) => {
                navigate('login')
                console.log(res);
                console.log(res.data);
            })
    }



    return (
        <>
            <PageContainer>
                <ContentCentered>
                    <FormContainer>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='text-lg font-semibold'>Welcome</h1>
                            <h3 className='text-sm font-normal'>Let's do some budgeting</h3>
                        </div>

                        <FormInput type="text" placeholder="Username" icon={<FaUser />} onChange={setUsername} />
                        <FormInput type="text" placeholder="E-mail" icon={<FaAt />} onChange={setEmail} />
                        <FormInput type="password" placeholder="Password" icon={<FaKey />} onChange={setPassword} />
                        <FormInput type="password" placeholder="Confirm password" icon={<FaLock />} onChange={setConfirmPassword} />

                        <div>
                            <button className='px-8 py-1 bg-slate-600 rounded-full text-white'>Register</button>
                        </div>
                        <div className='text-sm'>
                            <span>Already have an account?</span>
                            <Link to='login' className='underline pl-2'>Log in</Link>
                        </div>
                    </FormContainer>
                </ContentCentered>
            </PageContainer>
            <Footer />
        </>
    )
}

export default Register