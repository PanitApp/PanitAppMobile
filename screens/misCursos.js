import React, { useContext, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, ListItem, Left, Switch, List, Input, Item, Form } from 'native-base';
import { ScrollView, StyleSheet, Dimensions, Modal, View, Image } from 'react-native'
import { useMutation, useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'
import { CREATE_CURSO } from '../graphql/mutations'
import { CursosContext } from '../context/cursosContext';
import FormCurso from './formCurso';
import { globalStyles } from '../styles/globalStyles'
import { AuthContext } from '../context/authContext';

import logo from '../assets/Panita.png'

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
        <Content style={{ backgroundColor: 'white' }}>
            <Modal animationType="slide" visible={openModal}>
                <Button transparent onPress={() => setOpenModal(false)} >
                    <Icon active name="close-circle" style={{ color: '#037E85' }} />
                </Button>
                <FormCurso crearCurso={crearCurso} />
            </Modal>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Mis cursos</Text>
            </View>
            {user.rol.id == 1 ?
                <View>
                    <Body>
                        <Button primary onPress={() => setOpenModal(true)} style={styles.btn}>
                            <Icon active name="add-circle" />
                            <Text>Crear curso</Text>
                        </Button>
                    </Body>
                </View> : null
            }
            {
                cursos.filter(curso => curso != null).map((curso, index) => {
                    return curso != null ?
                        <CardItem key={curso.id} >
                            <Icon active name="school" style={{ color: '#013d40' }} />
                            <Text style={globalStyles.cardItemTitle} onPress={() => navigation.navigate('CursoDetalle', { curso: curso })}>
                                {curso.nombre}
                            </Text>
                            <Right>
                                <Icon name="arrow-forward" style={{ color: '#037E85' }} onPress={() => navigation.navigate('CursoDetalle', { curso: curso })} />
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
        margin: 20,
        backgroundColor: '#03979E'
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
})
