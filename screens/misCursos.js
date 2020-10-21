import React, { useState } from 'react';
import { View, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'
import { CREATE_CURSO } from '../graphql/mutations'
import FormCurso from './formCurso';
import { useMutation } from '@apollo/client';


const { width: WIDTH } = Dimensions.get('window')


export default function MisCursos({ navigation, props }) {
    

    const [ cursos, setCursos ] = useState([])
    const { loading, error } = useQuery(GET_CURSOS_BY_PROFESOR, { 
        variables: { id_profesor: 1 },
        onCompleted: (data) => {
            setCursos(data.getCursosByProfesor)
        }
    })
    const [openModal, setOpenModal] = useState(false)

    const [ crearCurso, _ ] = useMutation(CREATE_CURSO, {
        onCompleted: (data) => {
            setOpenModal(false)
            setCursos( [...cursos, data.crearCurso] )
            navigation.navigate('CursoDetalle', {curso: data.crearCurso})
        },
        onError: (err) => {
            console.log(err)
        }
    })
    
    if (loading) return <Text>loading...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Content>

            <Modal animationType="slide" visible={openModal}>
                <Button bordered onPress={() => setOpenModal(false)}>
                    <Icon active name="close-circle" />
                    <Text>Cerrar</Text>
                </Button>
                <FormCurso crearCurso={crearCurso} />
            </Modal>

            <Card style={{ marginLeft:30, width: WIDTH - 60 }}>
                <CardItem header bordered>
                    <Text>Mis notas</Text>
                </CardItem>

                {
                    cursos.filter(curso => curso != null).map((curso, index) => {
                        return curso != null ?
                            <CardItem key={curso.id}>
                                <Icon active name="school" />
                                <Text>
                                    {curso.nombre}
                                </Text>
                                <Right>
                                    <Icon name="arrow-forward" onPress={() => navigation.navigate('CursoDetalle', {curso: curso})} />
                                </Right>
                            </CardItem>
                            : null
                    })
                }

                <CardItem footer bordered>
                    <Body>
                        <Button bordered onPress={() => setOpenModal(true)}>
                            <Icon active name="add-circle" />
                            <Text>Crear curso</Text>
                        </Button>
                    </Body>

                </CardItem>
            </Card>
        </Content>

    );
}

const styles = StyleSheet.create({
    btn:{
        alignContent:"center",
        flexDirection:"row",
        flex:1,
        backgroundColor:"green",    
    }
})
