import React, { useState } from 'react';
import FormAnuncio from './formAnuncio';
import logo from '../assets/Cursos.png'

import { Card, CardItem, Icon, Body, Button, Text, Content, Container, Right } from 'native-base';
import { Dimensions, TouchableWithoutFeedback, Keyboard, View, Modal, StyleSheet, Image} from 'react-native';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ANUNCIOS_BY_CURSO_ID } from '../graphql/queries';
import { CREAR_ANUNCIO } from '../graphql/mutations';

import { globalStyles } from '../styles/globalStyles';
const { width: WIDTH } = Dimensions.get('window')

export default function anunciosCurso({ curso, navigation }) {

    const [openModal, setOpenModal] = useState(false)
    const [anuncios, setAnuncios] = useState([])

    const [crearAnuncio, _] = useMutation(CREAR_ANUNCIO, {
        onCompleted: (data) => {
            setOpenModal(false)
            setAnuncios([...anuncios, data.crearAnuncio])
            navigation.navigate('anunciosCurso')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const { loading } = useQuery(GET_ANUNCIOS_BY_CURSO_ID, {
        variables: { id_curso: curso.id },
        onCompleted: data => setAnuncios(data.getAnunciosByCurso),
        onError: err => console.log(err)
    })

    console.log(anuncios)

    return (
        <Container>
            <Content>
                <Modal animationType="slide" visible={openModal}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <Button bordered onPress={() => setOpenModal(false)}>
                                <Icon active name="close-circle" />
                                <Text>Cerrar</Text>
                            </Button>
                            <FormAnuncio crearAnuncio={crearAnuncio} curso={curso} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>Anuncios</Text>
                </View>
                <Card style={{ width: WIDTH }} transparent>
                    <CardItem >
                        <Text style={styles.texto}>Acá encontraras todos los anuncios del curso: {curso.nombre}</Text>
                    </CardItem>
                </Card>
                <View>
                    <Body>
                        <Button primary onPress={() => setOpenModal(true)} style={styles.btn}>
                            <Icon active name="add-circle" />
                            <Text>Nuevo anuncio</Text>
                        </Button>
                    </Body>
                </View>
                {anuncios.map( (anuncio, index) => (
                    <CardItem key={anuncio.id}>
                        <Icon active name="alarm" style={{ color: '#013d40' }}/>
                        <Body>
                            <Text style={globalStyles.cardItemTitle} onPress={() => navigation.navigate('anuncioDetalle', { anuncio: anuncio })}> 
                                Anuncio #{index + 1}: {anuncio.descripcion}
                            </Text>
                        </Body>
                        <Right>
                                <Icon name="build" style={{ color: '#037E85' }} onPress={() => navigation.navigate('anuncioDetalle', { anuncio: anuncio })} />
                            </Right>
                    </CardItem>
                ))}
            </Content>
        </Container>
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
    texto: {
        fontSize: 20,
        color: 'gray',
    }
})