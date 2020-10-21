import React, { createContext, useState } from 'react'
import { GET_ANUNCIOS_BY_CURSO_ID } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import { Text } from 'native-base';

export const AnunciosContext = createContext()

export default function AnunciosContextProvider({ props, route }) {

    const { curso } = route.params;
    const [anuncios, setAnuncios] = useState([])
    const { loading, error } = useQuery(GET_ANUNCIOS_BY_CURSO_ID, {
        variables: { curso_id: curso.id },
        onCompleted: (data) => {
            setAnuncios(data.getAnunciosByCursoId)
        }
    })
    if (loading) return <Text>loading...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <AnunciosContextProvider value={{ anuncios, setAnuncios }}>
            {props.children}
        </AnunciosContextProvider>
    );
}

