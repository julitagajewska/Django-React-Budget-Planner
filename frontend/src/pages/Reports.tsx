import React, { useContext } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';

const Reports = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Reports");

    return (
        <LoggedInPageContainer>
            Reports
        </LoggedInPageContainer>
    )
}

export default Reports