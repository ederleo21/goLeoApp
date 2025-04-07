import React, { createContext, useState, useEffect } from 'react'
import { GetUser } from '../api/userApi'

// Contexto global de la info del usuario autenticado
export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const fetchUser = async() => {
            try{
                const userData = await GetUser()
                setUser(userData)
            }catch(error){
                console.error("Error al obtener el usuario", error)
            }finally {
                setLoading(false);
            }
        }
        fetchUser()
    }, [])

    return(
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}


