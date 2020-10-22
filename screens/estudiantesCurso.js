import React, { useState } from 'react';
import { Content, CardItem, Icon, Right, Body, Button, Text, Left, Title } from 'native-base';
import { Dimensions, StyleSheet, View } from 'react-native'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_ESTUDIANTES_BY_CURSO, GET_ESTUDIANTE } from '../graphql/queries'
import { ADD_ESTUDIANTE } from '../graphql/mutations'
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ curso }) {

    const [estudiantes, setEstudiantes] = useState([])
    const [newEstudiante, setNewEstudiante] = useState("")
    const [error, setError] = useState('')

    const { loading }  = useQuery(GET_ESTUDIANTES_BY_CURSO, {
        variables: {id_curso: curso.id},
        onCompleted: data => setEstudiantes(data.getEstudiantesByCurso),
        onError: err => console.log(err) 
    })

    const [addEstudiante] = useMutation(ADD_ESTUDIANTE)

    const [getUsuario] = useLazyQuery(GET_ESTUDIANTE, { 
        onCompleted: async (data) => {
            if ( data.getUsuarioByUsername[0] && data.getUsuarioByUsername[0].rol.id === 2){
                let result = await addEstudiante({ variables: { id_estudiante: data.getUsuarioByUsername[0].id, id_curso: curso.id }})
                setEstudiantes([...estudiantes, data.getUsuarioByUsername[0]])
                setError('')
            }else{
                setError('El usuario no es un estudiante')
            }
        },
        onError: (err) => console.log(err)
    })

    return (
        <Content>
            <CardItem header bordered>
                    <Left>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor={'gray'}
                            onChangeText={val => setNewEstudiante(val)}
                        />
                    </Left>
                    <Right>
                        <Button bordered onPress={() => getUsuario({variables: {nombre_usuario: newEstudiante}})}>
                            <Icon active name="person-add" />
                        </Button>
                    </Right>
            </CardItem>
            {error?(<Text style={styles.errorMessage}>{error}</Text>):(<View></View>)}

            <Text> Lista de estudiantes </Text>

            {estudiantes.map(estudiante => (
                <CardItem key={estudiante.id} >
                    <Icon active name="person" />
                    <Body>
                        <Text>
                            Correo: {estudiante.email}
                        </Text>
                        <Text>
                            Nombre: {estudiante.nombres}
                        </Text>
                    </Body>
                </CardItem>
            ))}


        </Content>

    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        width: WIDTH,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        color: 'black',
        textAlign: 'center',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        margin: 10,
        color: 'black',
    },
    btn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        justifyContent: 'center',
        fontSize: 16,
        margin: 10
    },
    errorMessage: {
        color:'red'
    }
})
