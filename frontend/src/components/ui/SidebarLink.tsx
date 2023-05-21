import React, { ReactNode } from 'react'

import { IconType } from 'react-icons/lib'
import { Link, useNavigate } from 'react-router-dom'

type SidebarLinkProps = {
    text: string,
    to: string,
    icon: ReactNode
}

const SidebarLink = ({ text, to, icon }: SidebarLinkProps) => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-row items-center text-base gap-2 my-2 text-white text-opacity-50 hover:text-opacity-100 transition duration-300 ease-in-out cursor-pointer' onClick={() => navigate(to)}>
            {icon}
            <span>{text}</span>
        </div>
    )
}

export default SidebarLink