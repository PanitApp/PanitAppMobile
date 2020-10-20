import React, { createContext, useMemo, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../graphql/queries'
import { useLazyQuery } from '@apollo/client';

export const CursoContext = createContext()

export default function CursoContextProvider(props) {


    const curso = {
        id: null,
        nombre: '',
        descripcion: '',
        profesor: {
            id: null,
            nombre_usuario: '',
            nombres: '',
            email: ''
        }
    }

    const [user, setUser] = useState(emptyUser)
    const [error, setError] = useState("")
    const [isLogged, setIsLogged] = useState(false)

    const [getUser] = useLazyQuery(GET_USER, {
        onCompleted: (data) => {
            try {
                if (data.getUsuarioByUsername.length <= 0) {
                    setError("Usuario no encontrado")
                    setUser(emptyUser)
                    setIsLogged(false)
                } else {
                    AsyncStorage.setItem('user', JSON.stringify(data.getUsuarioByUsername[0])).then(() => {
                        setError("")
                        setIsLogged(true)
                    })
                }
            } catch (e) {
                // saving error
                console.log("Ocurrio un error: " + e)
            }
            setUser(data.getUsuarioByUsername[0])
        },
        onError: (err) => {
            console.log("Ocurrio un error: " + err)
            setUser(emptyUser)
            setIsLogged(false)
            setError(err)
        },
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        // check if the user is logged in
        AsyncStorage.getItem('user').then(storedUser => {
            if (storedUser) {
                setUser(JSON.parse(storedUser))
                setIsLogged(true)
            } else {
                setUser(emptyUser)
                setIsLogged(false)
            }
        })
    }, [])

    useEffect(() => {
        console.log(error)
    }, [error])

    const authcontext = useMemo(() => ({
        user: user,
        error: error,
        isLogged: isLogged,
        login: (username, password) => {
            // retrive the user and set the state
            getUser({ variables: { nombre_usuario: username } })
        },
        logout: () => {
            try {
                AsyncStorage.removeItem('user').then(() => {
                    setUser(emptyUser)
                    setIsLogged(false)
                })
            } catch (e) {
                console.log("Ocurrio un error: " + e)
                setError(error)
            }
        },
        register: () => {
            // create an user and set the state
        }
    }))

    return (
        <CursoContext.Provider value={CursoContext}>
            {props.children}
        </CursoContext.Provider>
    );
}

