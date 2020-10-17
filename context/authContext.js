import React, { createContext, useMemo, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../graphql/queries'
import { useLazyQuery } from '@apollo/client';

export const AuthContext = createContext()

export default function AuthContextProvider( props ) {
    

    const [user, setUser] = useState(null)
    const [getUser] = useLazyQuery(GET_USER,  {
        onCompleted: async (data) => {
            try {
                await AsyncStorage.setItem('user', JSON.stringify(data.getUsuarioByUsername[0]))
            } catch (e) {
                // saving error
                console.log("Ocurrio un error: " + error)
                setUser(null)
            }    
            setUser(data.getUsuarioByUsername[0])    
        },
        onError: (err) => {
            console.log("Ocurrio un error: " + err)
            setUser(null)    
        }
    });

    useEffect(() => {
        async function checkUser(){
            // check if the user is logged in
            let storedUser = await AsyncStorage.getItem('user')
            if (storedUser != null){
                setUser(JSON.parse(storedUser))
            }else{
                setUser(null)
            }
        }
        checkUser()
    }, [])

    const authcontext = useMemo(() => ({
        user: user,
        login: (username, password) => {
            // retrive the user and set the state
            getUser({ variables: { nombre_usuario: username } })
        },
        logout: async () => {
            try {
                await AsyncStorage.removeItem('user')
                setUser(null)
            } catch(e) {
                console.log("Ocurrio un error: " + error)
            }
        },
        register: () => {
            // create an user and set the state
        }
    }))

    return (
        <AuthContext.Provider value={authcontext}>
            {props.children}
        </AuthContext.Provider>
    );
}

