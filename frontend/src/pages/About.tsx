import React from 'react'
import PageContainer from '../layout/PageContainer'
import ContentCentered from '../layout/ContentCentered'
import { FaGithub } from 'react-icons/fa'
import Footer from '../components/Footer'

const About = () => {
    return (
        <>
            <div className='shadow-md w-full h-full bg-[#000000] bg-opacity-10 backdrop-blur-md flex flex-row justify-center gap-40 px-64 py-32'>
                <div className='w-full flex flex-col gap-8 text-justify justify-center text-white'>
                    <h1 className='text-3xl text-white font-base'>About The Project</h1>
                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.
                    </p>

                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt!
                    </p>

                    <p className='font-thin'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                </div>


                <div className='w-full flex flex-col gap-8 text-justify justify-center text-white'>
                    <h1 className='text-3xl text-white font-base'>About Us</h1>

                    <div className='flex flex-col justify-center gap-4'>
                        <h1 className='text-xl text-white font-base'>Aleksandra Niedźwiecka</h1>
                        <p className='font-thin'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <a
                            href='https://github.com/Olqa00'
                            className='text-white w-fit flex flex-row justify-start items-center gap-4 font-thin cursor-pointer text-opacity-75 hover:text-opacity-100 transition duration-150 ease-in-out'
                            target="_blank"
                            rel="noreferrer">
                            <FaGithub /> Olqa00
                        </a>
                    </div>

                    <div className='flex flex-col justify-center gap-4'>
                        <h1 className='text-xl text-white font-base'>Julita Gajewska</h1>
                        <p className='font-thin'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <a
                            href='https://github.com/julitagajewska'
                            className='text-white w-fit flex flex-row justify-start items-center gap-4 font-thin cursor-pointer text-opacity-75 hover:text-opacity-100 transition duration-150 ease-in-out'
                            target="_blank"
                            rel="noreferrer">
                            <FaGithub /> julitagajewska
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About