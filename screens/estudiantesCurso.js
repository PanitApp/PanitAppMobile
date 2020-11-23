import React, { useContext, useState } from 'react';
import { Content, CardItem, Icon, Right, Body, Button, Text, Left, Title, Item, Picker } from 'native-base';
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_ESTUDIANTES_BY_CURSO, GET_ESTUDIANTE, GET_USUARIOS, GET_ESTUDIANTES } from '../graphql/queries'
import { ADD_ESTUDIANTE } from '../graphql/mutations'
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../context/authContext';

import logo from '../assets/Calendario.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ curso }) {

    const [usuarios, setUsuarios] = useState([])
    const [estudiantes, setEstudiantes] = useState([])
    const [newEstudiante, setNewEstudiante] = useState("")
    const [error, setError] = useState('')

    const { user, logout } = useContext(AuthContext)

    const { loading2, error2 } = useQuery(GET_ESTUDIANTES, {
        variables: {rol: "Estudiante"},
        onCompleted: (data) => {
            setUsuarios(data.getUsuariosByRol)
        }
    })

    const { loading } = useQuery(GET_ESTUDIANTES_BY_CURSO, {
        variables: { id_curso: curso.id },
        onCompleted: data => setEstudiantes(data.getEstudiantesByCurso),
        onError: err => console.log(err)
    })

    const [addEstudiante] = useMutation(ADD_ESTUDIANTE)

    const [getUsuario] = useLazyQuery(GET_ESTUDIANTE, {
        onCompleted: async (data) => {
            if (data.getUsuarioByUsername[0] && data.getUsuarioByUsername[0].rol === 'Estudiante') {
                let result = await addEstudiante({ variables: { id_estudiante: data.getUsuarioByUsername[0].id, id_curso: curso.id } })
                setEstudiantes([...estudiantes, data.getUsuarioByUsername[0]])
                setError('')
            } else {
                setError('El usuario no es un estudiante')
            }
        },
        onError: (err) => console.log(err)
    })

    if (loading2) return <Text>Loading...</Text>
    return (
        <Content>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Estudiantes</Text>
            </View>
            {user.rol == 'Profesor' ?
                <CardItem>
                    <Body>
                        <Item picker>
                            <Picker
                                placeholderTextColor={'gray'}
                                selectedValue={newEstudiante}
                                onValueChange={val => setNewEstudiante(val)}
                            >
                                {usuarios.map(usuario => {
                                    return <Picker.Item key={usuario.id} label={usuario.username} value={usuario.username} />
                                })}
                            </Picker>
                        </Item>
                    </Body>
                    <Right>
                        <Button bordered style={styles.btn} onPress={() => getUsuario({ variables: { username: newEstudiante } })}>
                            <Icon active name="person-add" style={styles.btn} />
                        </Button>
                    </Right>
                </CardItem> : null}
            {error ? (<Text style={styles.errorMessage}>{error}</Text>) : (<View></View>)}

            {estudiantes.map(estudiante => (
                <CardItem key={estudiante.id} >
                    <Icon active name="person" style={{ color: '#037E85' }} />
                    <Body>
                        <Text>
                            {estudiante.first_name}
                        </Text>
                        <Text>
                            Correo: {estudiante.email}
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
    errorMessage: {
        color: 'red',
        width: WIDTH,
        marginLeft: 10
    },
    btn: {
        margin: 20,
        borderColor: '#03979E',
        color: "#037E85"
    },
    logoContainer: {
        alignItems: 'center',
        margin: 10
    },
    logo: {
        width: 200,
        height: 120,
    },
    title: {
        color: "#03979E",
        fontSize: 40,
        textAlign: 'center'
    },
    texto: {
        fontSize: 20,
        color: 'gray',
    }
})