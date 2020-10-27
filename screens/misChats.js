import React, { useContext, useState } from 'react';
import { Content, Body, Text, ListItem, Left, List, Thumbnail, Icon, CardItem, Input, Right, Button } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_CHATS, GET_ESTUDIANTE } from '../graphql/queries'
import { AuthContext } from '../context/authContext';
import { CREAR_CHAT } from '../graphql/mutations'

import grupo from '../assets/logo1.png'
import personal from '../assets/Chat.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation }) {
    const { user, logout } = useContext(AuthContext)

    const [chats, setChats] = useState([])
    const [newChatName, setNewChatName] = useState('')
    const [newChatUser, setNewChatUser] = useState('')
    const [err, setErr] = useState('')

    const { loading, error } = useQuery(GET_CHATS, {
        variables: { userId: user.id },
        onCompleted: (data) => {
            setChats(data.getChatByUser)
        }
    })

    const [crearChat, _] = useMutation(CREAR_CHAT,{
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (err) => console.log(err)
    })

    const [getUsuario] = useLazyQuery(GET_ESTUDIANTE, {
        onCompleted: async (data) => {
            let result = await crearChat({ variables: { participantes: [data.getUsuarioByUsername[0].id, user.id], nombre: newChatName } })
             console.log('OK', result)
             setChats([...chats, result.data.crearChat])
            // console.log('OK', data.getUsuarioByUsername[0])
        },
        onError: (err) => console.log(err)
    })

    if (loading) return <ActivityIndicator />
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Content style={{ backgroundColor: 'white' }}>
            <CardItem >
                <Body>
                    <Input
                        placeholder="Nombre"
                        placeholderTextColor={'gray'}
                        onChangeText={val => setNewChatName(val)}
                    />
                    <Input
                        placeholder="Usuario"
                        placeholderTextColor={'gray'}
                        onChangeText={val => setNewChatUser(val)}
                    />

                </Body>
                <Right>
                    <Button transparent block onPress={() => getUsuario({ variables: { nombre_usuario: newChatUser } })}>
                        <Text>Enviar</Text>
                        <Icon active name="arrow-dropright-circle" />
                    </Button>
                </Right>
            </CardItem>
            <List>
                {
                    chats.map(chat => {
                        return chat.participantes.length > 2 ?
                            <ListItem avatar key={chat._id} onPress={() => navigation.navigate('Chat', { chat: chat, logo: grupo })}>
                                <Left>
                                    <Thumbnail source={grupo} />
                                </Left>
                                <Body>
                                    <Text>{chat.nombre}</Text>
                                    <Text note>Grupo</Text>
                                </Body>
                            </ListItem>
                            :
                            <ListItem avatar key={chat._id} onPress={() => navigation.navigate('Chat', { chat: chat, logo: personal })}>
                                <Left>
                                    <Thumbnail source={personal} />
                                </Left>
                                <Body>
                                    <Text>{chat.nombre}</Text>
                                    <Text note> Chat con
                                        {
                                            chat.participantes.map(participante => {
                                                return participante.nombre_usuario != user.nombre_usuario ? ' ' + participante.nombre_usuario : null
                                            })
                                        }
                                    </Text>
                                </Body>
                            </ListItem>
                    })
                }
            </List>
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
