import React, { useContext } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';

const Transactions = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Transactions");

    return (
        <LoggedInPageContainer>
            Transactions
        </LoggedInPageContainer>
    )
}

export default Transactions