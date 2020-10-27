import React, { useContext, useState } from 'react';
import { Thumbnail, Container, Content, Icon, Right, Body, Button, Text, ListItem, Left, List, Input, Item, Card, CardItem } from 'native-base';
import { StyleSheet, Dimensions, View, Image } from 'react-native'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_MENSAJES_BY_CHAT } from '../graphql/queries'
import { ADD_MENSAJE } from '../graphql/mutations'
import { AuthContext } from '../context/authContext';

import logo from '../assets/Panita.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ route }) {
    const { user, logout } = useContext(AuthContext)
    const [mensajes, setMensajes] = useState([])
    const [newMensaje, setNewMensaje] = useState('')

    const { loading, error } = useQuery(GET_MENSAJES_BY_CHAT, {
        variables: { chatId: route.params.chat._id },
        onCompleted: (data) => {
            setMensajes(data.getMensajesChat)
        }
    })

    const [addMensaje, _] = useMutation(ADD_MENSAJE, {
        onCompleted: (data) => {
            setMensajes([...mensajes, data.crearMensaje])
        },
        onError: (err) => {
            console.log(err)
        }
    })

    if (loading) return <Text>loading...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Container>
            <Content>
                <View style={styles.logoContainer}>
                    <Image source={route.params.logo} style={styles.logo} />
                    <Text style={styles.title}>{route.params.chat.nombre}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <CardItem >
                        <Body>
                            <Input
                                placeholder="Escribe un mensaje"
                                placeholderTextColor={'gray'}
                                onChangeText={val => setNewMensaje(val)}
                            />

                        </Body>
                        <Right>
                            <Button transparent block onPress={() => {
                                 let mensaje = { contenido: newMensaje, chat: route.params.chat._id, userId: user.id, destacado: false, fijado: false }
                                 console.log(mensaje)
                                 addMensaje({variables: mensaje})
                                //addMensaje({ variables: { contenido: newMensaje, chat: route.params.chat._id, userId: user.id, destacado: false, fijado: false } })
                            }}
                            >
                                <Text>Enviar</Text>
                                <Icon active name="arrow-dropright-circle" />
                            </Button>
                        </Right>
                    </CardItem>

                    <Card transparent style={{ width: WIDTH - 30 }}>
                        {
                            mensajes.map((msg, index) => {
                                return msg.usuario != null ?
                                    msg.usuario.id == user.id ?
                                        <CardItem key={msg._id} >
                                            <Left></Left>
                                            <Right>
                                                <Text note style={styles.mensajePropio}>{msg.contenido}</Text>
                                            </Right>
                                        </CardItem>
                                        :
                                        <CardItem key={msg._id}>
                                            <Left>
                                                <Text note style={styles.mensaje}>{msg.contenido}</Text>
                                            </Left>
                                        </CardItem>
                                    : null
                            })
                        }
                    </Card>
                </View>
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
    mensaje: {
        padding: 10,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        color: 'white',
        borderRadius: 25,
        width: WIDTH / 2,
    },
    mensajePropio: {
        padding: 10,
        backgroundColor: 'rgba(3, 126, 133, 0.9)',
        color: 'white',
        borderRadius: 25,
        width: WIDTH / 2,
        textAlign: 'right'
    }
})
