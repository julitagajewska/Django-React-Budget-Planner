import React, { Dispatch, ReactNode, SetStateAction, useContext } from 'react'

import { IconType } from 'react-icons/lib'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarLinkContext, SidebarLinkContextType } from '../../context/SidebarLinkContext'

type SidebarLinkProps = {
    text: string,
    to: string,
    icon: ReactNode
}

const SidebarLink = ({ text, to, icon }: SidebarLinkProps) => {

    const navigate = useNavigate();
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;

    return (
        <div className={`flex flex-row items-center text-base gap-2 my-2 text-white ${text === active ? 'text-opacity-80' : 'text-opacity-50'} hover:text-opacity-100 transition duration-300 ease-in-out cursor-pointer`} onClick={() => navigate(to)} >
            {icon}
            <span>{text}</span>
        </div>
    )
}

export default SidebarLink