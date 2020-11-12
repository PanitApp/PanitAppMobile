import React, { createContext, useMemo, useState, useEffect } from 'react'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GET_USER } from '../graphql/queries'
import { CREATE_USER, LOGIN } from '../graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client';

export const AuthContext = createContext()

export default function AuthContextProvider( props ) {
    
    const emptyUser = {
        id: null,
        username: "",
        contrasena:"", 
        nombres:"",
        email:"",
        rol:""
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
                }else{
                    AsyncStorage.setItem('user', JSON.stringify(data.getUsuarioByUsername[0])).then(() => {
                        setError("")
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
            setError(err)
        },  
        fetchPolicy: 'no-cache'
    });

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            try {
                AsyncStorage.setItem('token',data.login.access).then(() => {
                    setIsLogged(true)
                    setError("")
                    Alert.alert('Bienvenido a PanitApp!');
                })
            } catch (err){
                setError("Error interno")
                setIsLogged(false)
                Alert.alert('Ops!', 'Error al traer la información, intenta nuevamente');
            }
        },
        onError: (err) => {
            console.log("Ocurrio un error en hook en onError: " + err)
            setError("Credenciales invalidas")
            setIsLogged(false)
        }
    })

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            try {
                AsyncStorage.setItem('user', JSON.stringify(data.crearUsuario)).then(() => {
                    setIsLogged(true)
                    setError("")
                    Alert.alert('Bienvenido a PanitApp!', 'Usuario creado exitosamente!');
                })
            } catch (err){
                setError("err")
                setUser(emptyUser)
                setIsLogged(false)
                Alert.alert('Ops!', 'Error al traer la información, intenta nuevamente');
            }
            setUser(data.crearUsuario)
        },
        onError: (err) => {
            console.log("Ocurrio un error en hook en onError: " + err)
            setError("err")
            setIsLogged(false)
            setUser(emptyUser)
            Alert.alert('Ops!', 'Parece que ocurrió un error, intenta nuevamente');
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
        setUser: setUser,
        login: async (username, password) => {
            // retrive the user and set the state
            const a = await login({variables: {username: username, password: password}})
            if (a != undefined) {
                getUser({ variables: { username: username } })
            }
            
        },
        logout: () => {
            try {
                AsyncStorage.removeItem('user').then(() => {
                    setUser(emptyUser)
                    setIsLogged(false)
                })
                AsyncStorage.removeItem('token')
            } catch(e) {
                console.log("Ocurrio un error: " + e)
                setError(error)
            }
        },
        register: (usuario) => {
            createUser({ variables: { "usuario": { 
                username: usuario.username,
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

