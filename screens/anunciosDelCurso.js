import React, { useContext, useState } from 'react';
import { Content, Card, CardItem, Icon, Body, Button, Text } from 'native-base';
import { Dimensions, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useMutation } from '@apollo/client';
import { CREAR_ANUNCIO } from '../graphql/mutations'
import { AnunciosContext } from '../context/anunciosContext';
import FormAnuncio from './formAnuncio';

const { width: WIDTH } = Dimensions.get('window')

export default function AnunciosDelCurso({ route }) {

    const { curso } = route.params;
    const { anuncios, setAnuncios } = useContext(AnunciosContext)
    const [openModal, setOpenModal] = useState(false)

    const [crearAnuncio, _] = useMutation(CREAR_ANUNCIO, {
        onCompleted: (data) => {
            setOpenModal(false)
            setAnuncios([...anuncios, data.crearAnuncio])
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <Content>

            <Modal animationType="slide" visible={openModal}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Button bordered onPress={() => setOpenModal(false)}>
                            <Icon active name="close-circle" />
                            <Text>Cerrar</Text>
                        </Button>
                        <FormAnuncio crearAnuncio={crearAnuncio} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Card style={{ marginLeft: 30, width: WIDTH - 60 }}>
                <CardItem header bordered>
                    <Text>Anuncios: {curso.nombre}</Text>
                </CardItem>

                {
                    curso.anuncio.filter(anuncio => anuncio != null).map((anuncio) => {
                        return anuncio != null ?
                            <CardItem>
                                <Icon active name="school" />
                                <Text>{anuncio.descripcion}</Text>
                            </CardItem>
                            : null
                    })
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
