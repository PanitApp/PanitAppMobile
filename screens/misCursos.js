import React, { useContext, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, ListItem, Left, Switch, List, Input, Item, Form } from 'native-base';
import { ScrollView, StyleSheet, Dimensions, Modal } from 'react-native'
import { useMutation, useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'
import { CREATE_CURSO } from '../graphql/mutations'
import { CursosContext } from '../context/cursosContext';
import FormCurso from './formCurso';
import { globalStyles } from '../styles/globalStyles'
import { AuthContext } from '../context/authContext';

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation }) {
    const { cursos, setCursos } = useContext(CursosContext)
    const [openModal, setOpenModal] = useState(false)
    const { user, logout } = useContext(AuthContext)


    const [crearCurso, _] = useMutation(CREATE_CURSO, {
        onCompleted: (data) => {
            setOpenModal(false)
            setCursos([...cursos, data.crearCurso])
            navigation.navigate('CursoDetalle', { curso: data.crearCurso })
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <Content>
            <Modal animationType="slide" visible={openModal}>
                <Button transparent onPress={() => setOpenModal(false)} >
                    <Icon active name="close-circle" style={{ color: '#037E85' }} />
                </Button>
                <FormCurso crearCurso={crearCurso} />

            </Modal>
            {user.rol.id == 1 ?
                <CardItem footer bordered>
                    <Body>
                        <Button bordered onPress={() => setOpenModal(true)}>
                            <Icon active name="add-circle" />
                            <Text>Crear curso</Text>
                        </Button>
                    </Body>
                </CardItem> : null
            }
            {
                cursos.filter(curso => curso != null).map((curso, index) => {
                    return curso != null ?
                        <CardItem key={curso.id}>
                            <Icon active name="school" />
                            <Text style={globalStyles.cardItemTitle}>
                                {curso.nombre}
                            </Text>
                            <Right>
                                <Icon name="arrow-forward" onPress={() => navigation.navigate('CursoDetalle', { curso: curso })} />
                            </Right>
                        </CardItem>
                        : null
                })
            }



        </Content>

    );
}

const styles = StyleSheet.create({
    btn: {
        alignContent: "center",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "green",
    }
})