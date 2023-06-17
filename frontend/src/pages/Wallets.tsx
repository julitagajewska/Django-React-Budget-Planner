import React, { useContext } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';

const Wallets = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Wallets");

    return (
        <LoggedInPageContainer>
            Wallets
        </LoggedInPageContainer>
    )
}

export default Wallets