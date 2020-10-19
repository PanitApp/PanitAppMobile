import React, { createContext, useMemo, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../graphql/queries'
import { CREATE_USER } from '../graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client';

export const AuthContext = createContext()

export default function AuthContextProvider( props ) {
    
    const emptyUser = {
        id: null,
        nombre_usuario: "",
        contrasena:"", 
        nombres:"",
        email:"",
        rol: {
            id:null,
            nombre:""
        }
    }

    const [user, setUser] = useState(emptyUser)
    const [error, setError] = useState("")
    const [isLogged, setIsLogged] = useState(false)
    
    const [getUser] = useLazyQuery(GET_USER,  {
        onCompleted: (data) => {
            try {
                if (data.getUsuarioByUsername.length <= 0){
                    setError("Usuario no encontrado")
                    setUser(emptyUser)
                    setIsLogged(false)
                }else{
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

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log(data.crearUsuario)
            try {
                AsyncStorage.setItem('user', JSON.stringify(data.crearUsuario)).then(() => {
                    setError("")
                })
            } catch (err){
                setError(e)
                setUser(data.crearUsuario.nombre_usuario)
            }
        },
        onError: (err) => {
            console.log("Ocurrio un error en hook en onError: " + err)
            setError(err)
        }
    })


    useEffect(() => {
        // check if the user is logged in
        AsyncStorage.getItem('user').then(storedUser => {
            if (storedUser){
                setUser(JSON.parse(storedUser))
                setIsLogged(true)
            }else{
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
            } catch(e) {
                console.log("Ocurrio un error: " + e)
                setError(error)
            }
        },
        register: (usuario) => {
            createUser({ variables: { "usuario": { 
                nombre_usuario: usuario.nombre_usuario,
                contrasena: usuario.password,
                nombres: usuario.nombres,
                email: usuario.email,
                rol: usuario.rol }
            }})
        }
    }))

    return (
        <AuthContext.Provider value={authcontext}>
            {props.children}
        </AuthContext.Provider>
    );
}

