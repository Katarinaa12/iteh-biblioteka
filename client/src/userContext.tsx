import React, { useContext, useEffect, useState } from "react";
import { User, RegisterUser } from "./types";
import axios from "axios";


interface UserContextType {
    user?: User,
    login: (email: string, password: string) => Promise<void>,
    register: (ru: RegisterUser) => Promise<void>,
    logout: () => Promise<void>
}

export const UserContext = React.createContext<UserContextType | null>(null)

export function useUserContext() {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('Not inside User context');
    }
    return userContext;
}

interface Props {
    children: React.ReactNode
}

export function UserContextProvider(props: Props) {
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        axios.get('/api/user').then(res => {
            setUser(res.data);
        })
            .catch(() => {
                axios.defaults.headers.common.Authorization = undefined;
                setUser(undefined)
            })
    }, [])
    const login = async (email: string, password: string) => {
        const response = await axios.post('/api/login', { email, password });
        const token = response.data.token;
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        localStorage.setItem('token', token);
        setUser(response.data.user);
    }
    const register = async (regUser: RegisterUser) => {
        try {
            const response = await axios.post('/api/register', regUser);
            const token = response.data.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            localStorage.setItem('token', token);
            setUser(response.data.user);

        } catch (error) {

        }
    }
    const logout = async () => {
        try {
            await axios.post('/api/logout');
            setUser(undefined);
            localStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        } catch (error) {

        }
    }

    return (
        <UserContext.Provider
            value={{
                user, login, register, logout
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}