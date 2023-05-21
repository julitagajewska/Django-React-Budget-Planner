import React, { ReactNode, PropsWithChildren } from 'react'
import { FaGithub } from 'react-icons/fa'

type FooterProps = {
    children: ReactNode
}

const Footer = () => {
    return (
        <div className='w-full h-fit flex flex-row justify-center items-center  bg-opacity-10 py-4'>
            <p className='text-white font-thin text-sm text-opacity-75'>Project by </p>

            <a href='https://github.com/julitagajewska'
                className='text-sm inline-flex text-white w-fit flex-row justify-start items-center gap-2 font-thin cursor-pointer text-opacity-75 hover:text-opacity-100 transition duration-150 ease-in-out px-2'
                target="_blank"
                rel="noreferrer" ><FaGithub /> Aleksandra Niedźwiecka</a>

            <p className='text-white font-thin text-sm text-opacity-75'> & </p>

            <a href='https://github.com/julitagajewska'
                className='text-sm inline-flex text-white w-fit flex-row justify-start items-center gap-2 font-thin cursor-pointer text-opacity-75 hover:text-opacity-100 transition duration-150 ease-in-out px-2'
                target="_blank"
                rel="noreferrer" ><FaGithub /> Julita Gajewska</a>
        </div>
    )
}

export default Footer