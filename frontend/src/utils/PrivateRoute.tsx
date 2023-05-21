import React, { useContext, ReactNode, PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

type PrivateRouteProps = {
    loggedIn: boolean,
    to: string
}

const PrivateRoute = (props: PrivateRouteProps) => {

    const { user, authTokens } = useContext(AuthContext) as AuthContextType;

    if (props.loggedIn) {
        return authTokens.accessToken ? <Outlet /> : <Navigate to={props.to} />;
    }

    return authTokens.accessToken ? <Navigate to={props.to} /> : <Outlet />;

}

export default PrivateRoute