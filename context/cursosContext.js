import React, { createContext, useMemo, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR, GET_USER } from '../graphql/queries'
import { useLazyQuery, useQuery } from '@apollo/client';
import { AuthContext } from './authContext';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, Left, Title } from 'native-base';

export const CursosContext = createContext()

export default function CursosContextProvider(props) {

    const { user } = useContext(AuthContext)
    const [cursos, setCursos] = useState([])

    if (user.rol.id == 1) {
        const { loading, error } = useQuery(GET_CURSOS_BY_PROFESOR, {
            variables: { id_profesor: user.id },
            onCompleted: (data) => {
                setCursos(data.getCursosByProfesor)
            }
        })
        if (loading) return <Text>loading...</Text>
        if (error) return <Text>{console.log('error', error)}</Text>
    } else {
        const { loading, error } = useQuery(GET_CURSOS_BY_ESTUDIANTE, {
            variables: { id_estudiante: user.id },
            onCompleted: (data) => {
                setCursos(data.getCursosByEstudiante)
            }
        })
        if (loading) return <Text>loading...</Text>
        if (error) return <Text>{console.log('error', error)}</Text>
    }

    return (
        <CursosContext.Provider value={{ cursos, setCursos }}>
            {props.children}
        </CursosContext.Provider>
    );
}

