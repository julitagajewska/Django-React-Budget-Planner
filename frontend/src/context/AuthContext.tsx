import React, { FormEvent, PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";
import Login from "../pages/Login";
import Loading from "../pages/Loading";

export type AuthContextType = {
    authTokens: AuthTokensType,
    setAuthTokens: (authTokens: AuthTokensType) => void,
    user: UserType,
    setUsername: (user: UserType) => void,
    loginUser: (e: FormEvent<HTMLFormElement>, userame: string, password: string) => void, // Safety issue?
    logout: () => void
}

export type AuthTokensType = {
    accessToken: string | null,
    refreshToken: string | null
}

export type UserType = {
    username: string | null,
}

export type JWTResponseType = {
    exp: number,
    iat: number,
    jti: string,
    token_type: string,
    user_id: number,
    username: string
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState<AuthTokensType>(() =>
        localStorage.getItem('accessToken') ? {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
        } : {
            accessToken: null,
            refreshToken: null
        }
    );

    const [user, setUsername] = useState<UserType>(() =>
        localStorage.getItem('accessToken') ? {
            username: jwt_decode(String(localStorage.getItem('accessToken')))
        } : {
            username: null,
        }
    );

    const [loading, setLoading] = useState(true);

    const loginUser = async (e: FormEvent<HTMLFormElement>, username: string, password: string) => {
        e.preventDefault();
        console.log("Form submited");
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })

        const responseJSON = await response.json();

        if (response.status === 200) {
            setAuthTokens({
                accessToken: responseJSON.access,
                refreshToken: responseJSON.refresh
            });

            const jwtResponse: JWTResponseType = jwt_decode(responseJSON.access);

            setUsername({
                username: jwtResponse['username']
            });

            localStorage.setItem('accessToken', responseJSON.access);
            localStorage.setItem('refreshToken', responseJSON.refresh);

            navigate('home');

        } else {
            console.log(response)
        }
    }

    const logout = () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setAuthTokens({
            accessToken: null,
            refreshToken: null
        });

        setUsername({
            username: null
        });

        navigate('');
    }

    const updateToken = async () => {

        console.log("Tokens updated")

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refreshToken })
        })

        let responseJSON = await response.json();

        if (response.status === 200) {
            setAuthTokens({
                accessToken: responseJSON.access,
                refreshToken: responseJSON.refresh
            });

            const jwtResponse: JWTResponseType = jwt_decode(responseJSON.access);

            setUsername({
                username: jwtResponse['username']
            });

            localStorage.setItem('accessToken', responseJSON.access);
            localStorage.setItem('refreshToken', responseJSON.refresh);
        } else {
            logout();
        }

        if (loading) {
            setLoading(false)
        }
    }

    useEffect(() => {

        let fourMinutes = 1000 * 60 * 4;

        if (loading) {
            updateToken()
        }

        let intervalID = setInterval(() => {
            if (authTokens.accessToken !== null) {
                updateToken();
            }
        }, fourMinutes)

        return () => clearInterval(intervalID);

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens, user, setUsername, loginUser, logout }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}
