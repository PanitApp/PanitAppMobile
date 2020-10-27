import React, { useContext, useState } from 'react';
import { Thumbnail, Container, Content, Icon, Right, Body, Button, Text, ListItem, Left, List, Input, Item } from 'native-base';
import { StyleSheet, Dimensions, View, Image } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_MENSAJES_BY_CHAT } from '../graphql/queries'
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
    if (loading) return <Text>loading...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Container>
            <Content>
                <View style={styles.logoContainer}>
                    <Image source={route.params.logo} style={styles.logo} />
                    <Text style={styles.title}>{route.params.chat.nombre}</Text>
                </View>
                <List>
                    {
                        mensajes.map(msg => {
                            return msg.usuario != null ?
                                msg.usuario.id == user.id ?
                                    <ListItem avatar key={msg._id}>

                                        <Body>
                                            <Text note style={{ textAlign: 'right' }}>{msg.contenido + ' ' + msg.usuario.id}</Text>
                                        </Body>
                                        <Right>

                                        </Right>
                                    </ListItem>
                                    :
                                    <ListItem avatar key={msg._id} >
                                        <Left>
                                            <Thumbnail source={logo} />
                                        </Left>
                                        <Body>
                                            <Text note>{msg.contenido + ' ' + msg.usuario.id}</Text>
                                        </Body>
                                        {/* <Right>
                                            <Text note>{msg.fecha}</Text>
                                        </Right> */}
                                    </ListItem>
                                : null
                        })
                    }
                </List>
                <Item >
                    <Body>
                        <Input
                            placeholder="Escribe un mensaje"
                            placeholderTextColor={'gray'}
                            onChangeText={val => setNewMensaje(val)}
                        />

                    </Body>
                </Item>
                <Button transparent block >
                    <Text>Enviar</Text>
                    <Icon active name="person-add" />
                </Button>
                {/* <Item>
                    <Input placeholder="Underline Textbox" />
                </Item> */}
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
})
