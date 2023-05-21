import React from 'react'
import Footer from '../components/Footer'
import { FaGithub } from 'react-icons/fa'
import PageContainer from '../layout/PageContainer'
import ContentCentered from '../layout/ContentCentered'

const Features = () => {
    return (
        <>
            <div id="feature1" className='shadow-md w-full bg-[#000000] bg-opacity-10 backdrop-blur-md flex flex-row justify-start gap-40 px-64 py-32'>
                <div className='w-1/2 flex flex-col gap-8 text-justify justify-center text-white'>
                    <h1 className='text-3xl text-white font-base'>Monitor Your Spendings</h1>
                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                <div className='w-1/2 h-[30rem] bg-black opacity-40 flex flex-col justify-center items-center text-white'>
                    <h1>Image placeholder</h1>
                </div>
            </div>

            <div id="feature2" className='w-full flex flex-row justify-start gap-40 px-64 py-32'>
                <div className='w-1/2 h-[30rem] bg-black opacity-40 flex flex-col justify-center items-center text-white'>
                    <h1>Image placeholder</h1>
                </div>
                <div className='w-1/2 flex flex-col gap-8 text-justify justify-center text-white'>
                    <h1 className='text-3xl text-white font-base'>Get A Deep Insight</h1>
                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
            </div>

            <div id="featuret3" className='shadow-md w-full bg-[#000000] bg-opacity-10 backdrop-blur-md flex flex-row justify-start gap-40 px-64 py-32'>
                <div className='w-1/2 flex flex-col gap-8 text-justify justify-center text-white'>
                    <h1 className='text-3xl text-white font-base'>Budget together</h1>
                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                <div className='w-1/2 h-[30rem] bg-black opacity-40 flex flex-col justify-center items-center text-white'>
                    <h1>Image placeholder</h1>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Features