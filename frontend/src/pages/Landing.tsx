import React from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../layout/PageContainer'
import ContentCentered from '../layout/ContentCentered'
import HoverableButtonLarge from '../components/ui/buttons/HoverableButtonLarge'
import { Link } from 'react-scroll'

import { FaGithub } from 'react-icons/fa'
import Footer from '../components/Footer'

const Landing = () => {

    const navigate = useNavigate();

    return (
        <>
            <PageContainer>
                <ContentCentered>
                    <div className='w-full h-fit flex flex-col justify-center my-72 px-32'>
                        <div className="flex flex-col justify-center gap-10 items-center w-full">
                            <h1 className="text-6xl text-white font-light tracking-widest text-center">BUDGET PLANNER</h1>
                            <p className='w-1/2 text-white text-base font-thin text-center'>
                                Take your financial game to the next level with our powerful
                                insights and analytics. Our app gives you the tools to make
                                informed decisions, achieve your goals, and reach financial
                                freedom. Don't settle for less - try our web app today and
                                take control of your finances like never before!
                                <span className='block opacity-60 pt-2'>~ ChatGPT 2k23</span>
                            </p>
                            <HoverableButtonLarge text='Log in' onClick={() => navigate('login')} />
                        </div>
                    </div>
                </ContentCentered>
            </PageContainer>

            <Footer />
        </>
    )
}

export default Landing