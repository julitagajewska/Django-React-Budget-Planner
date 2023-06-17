import React, { useContext } from 'react'
import LoggedInPageContainer from '../layout/LoggedInPageContainer'
import { SidebarLinkContext, SidebarLinkContextType } from '../context/SidebarLinkContext';

const Profile = () => {

    // Sidebar active link context
    const { active, setActive } = useContext(SidebarLinkContext) as SidebarLinkContextType;
    setActive("Profile");

    return (
        <LoggedInPageContainer>
            Profile
        </LoggedInPageContainer>
    )
}

export default Profile