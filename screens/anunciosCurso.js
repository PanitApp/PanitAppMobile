import React, { useState } from 'react';
import { Card, CardItem, Icon, Body, Button, Text, Content } from 'native-base';
import { useMutation, useQuery } from '@apollo/client';
import { Dimensions, TouchableWithoutFeedback, Keyboard, View, Modal} from 'react-native'
import { GET_ANUNCIOS_BY_CURSO_ID } from '../graphql/queries';
import { CREAR_ANUNCIO } from '../graphql/mutations'
import FormAnuncio from './formAnuncio';

const { width: WIDTH } = Dimensions.get('window')

export default function anunciosCurso({ curso }) {

    const [openModal, setOpenModal] = useState(false)
    const [anuncios, setAnuncios] = useState([])

    const [crearAnuncio, _] = useMutation(CREAR_ANUNCIO, {
        onCompleted: (data) => {
            setOpenModal(false)
            setAnuncios([...anuncios, data.crearAnuncio])
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const { loading } = useQuery(GET_ANUNCIOS_BY_CURSO_ID, {
        variables: {id_curso: curso.id},
        onCompleted: data => setAnuncios(data.getAnunciosByCurso),
        onError: err => console.log(err) 
    })

    console.log(curso)
    return (
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

            <Card style={{ marginLeft: 30, width: WIDTH - 60 }}>
                <CardItem header bordered>
                    <Text>Anuncios: {curso.nombre}</Text>
                </CardItem>
                {
                    //map
                    anuncios.map(anuncio => (
                        <CardItem key={anuncio.id}>
                            <Icon active name="alarm" />
                            <Body>
                                <Text>
                                    Descripcion: {anuncio.descripcion}
                                </Text>
                            </Body>
                        </CardItem>
                    ))
                }
                <CardItem footer bordered>
                    <Body>
                        <Button bordered onPress={() => setOpenModal(true)}>
                            <Icon active name="add-circle" />
                            <Text>Nuevo anuncio</Text>
                        </Button>
                    </Body>

                </CardItem>
            </Card>
        </Content>

    );
}