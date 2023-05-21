import React, { ReactNode, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type NavigationLinkProps = {
    text: string,
    to: string
}

const NavigationLink = (props: PropsWithChildren<NavigationLinkProps>) => {
    return (
        <Link to={`${props.to}`} className='text-white text-opacity-75 text-base font-thin hover:text-opacity-100 transition duration-150 ease-in-out px-6'>
            {props.text}
        </Link>
    )
}

export default NavigationLink