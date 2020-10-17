import React, { createContext, useMemo, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../graphql/queries'
import { useLazyQuery } from '@apollo/client';

export const AuthContext = createContext()

export default function AuthContextProvider( props ) {
    

    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    
    const [getUser] = useLazyQuery(GET_USER,  {
        onCompleted: (data) => {
            try {
                if (data.getUsuarioByUsername.length <= 0){
                    throw "Usuario no encontrado"
                }
                AsyncStorage.setItem('user', JSON.stringify(data.getUsuarioByUsername[0])).then(() => {
                    setError("")
                })
            } catch (e) {
                // saving error
                console.log("Ocurrio un error: " + e)
                setError(e)
                setUser(null)
            }    
            setUser(data.getUsuarioByUsername[0])    
        },
        onError: (err) => {
            console.log("Ocurrio un error: " + err)
            setUser(null)
            setError(err)
        },
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        // check if the user is logged in
        AsyncStorage.getItem('user').then(storedUser => {
            if (storedUser){
                setUser(JSON.parse(storedUser))
            }else{
                setUser(null)
            }
        })
    }, [])

    useEffect(() => {
        console.log(error)
    }, [error])

    const authcontext = useMemo(() => ({
        user: user,
        error: error,
        login: (username, password) => {
            // retrive the user and set the state
            getUser({ variables: { nombre_usuario: username } })
        },
        logout: () => {
            try {
                AsyncStorage.removeItem('user').then(() => {
                    setUser(null)
                })
            } catch(e) {
                console.log("Ocurrio un error: " + e)
                setError(error)
            }
        },
        register: () => {
            // create an user and set the state
        }
    }), [user])

    return (
        <AuthContext.Provider value={authcontext}>
            {props.children}
        </AuthContext.Provider>
    );
}

