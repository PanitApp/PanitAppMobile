import React, { useContext, useState } from 'react';
import { Content, Body, Text, ListItem, Left, List, Thumbnail, Icon, CardItem, Input, Right, Button, Item, Picker } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { GET_CHATS, GET_ESTUDIANTE, GET_USUARIOS } from '../graphql/queries'
import { AuthContext } from '../context/authContext';
import { CREAR_CHAT } from '../graphql/mutations'

import grupo from '../assets/logo1.png'
import personal from '../assets/Chat.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation }) {
    const { user, logout } = useContext(AuthContext)

    const [usuarios, setUsuarios] = useState([])
    const [chats, setChats] = useState([])
    const [newChatName, setNewChatName] = useState('')
    const [newChatUser, setNewChatUser] = useState('')
    const [chatUsers, setChatUsers] = useState([])
    const [msg, setMsg] = useState({
        mensaje: '',
        error: false
    })

    const { loading2, error2 } = useQuery(GET_USUARIOS, {

        onCompleted: (data) => {
            setUsuarios(data.getUsuarios)
        },
        onError: (err) => console.log(err)
    })

    const { loading, error } = useQuery(GET_CHATS, {
        variables: { userId: user.id },
        onCompleted: (data) => {
            setChats(data.getChatByUser)
        },
        onError: (err) => console.log(user.id)
    })

    const [crearChat, _] = useMutation(CREAR_CHAT, {
        onCompleted: (data) => {
            setChats([...chats, data.crearChat])
            setNewChatName('')
            setChatUsers([])
            setMsg('')
        },
        onError: (err) => console.log(err)
    })

    const [getUsuario] = useLazyQuery(GET_ESTUDIANTE, {
        onCompleted: (data) => {
            setChats([...chats, result.data.crearChat])
        },
        onError: (err) => console.log(err)
    })

    if (loading) return <Text>Chat...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Content style={{ backgroundColor: 'white' }}>
            <CardItem >
                <Body>
                    <Input
                        placeholder="Nombre"
                        placeholderTextColor={'gray'}
                        onChangeText={val => setNewChatName(val)}
                        value={newChatName}
                    />
                    <Item picker>
                        <Picker
                            placeholderTextColor={'gray'}
                            selectedValue={newChatUser}
                            onValueChange={val => setNewChatUser(val)}
                        >
                            {
                                usuarios.filter(usuario => usuario.id != user.id).map(usuario => {
                                    return <Picker.Item key={usuario.id} label={usuario.username} value={usuario.id} />
                                })
                            }
                        </Picker>

                    </Item>
                    <Text>{msg.mensaje}</Text>
                    <Button transparent block onPress={() => {
                        if (chatUsers.indexOf(newChatUser) === -1) {
                            setChatUsers([...chatUsers, newChatUser])
                            setMsg({ mensaje: 'Añadido correctamente', error: true })
                        }
                        else
                            setMsg({ mensaje: 'Ya existe en el chat', error: false })
                    }}>

                        <Text>Añadir</Text>
                        <Icon active name="add-circle" />
                    </Button>
                </Body>
                <Right>
                    {
                        chatUsers.length != 0 && newChatName != '' ?
                            <Button transparent block onPress={() => crearChat({ variables: { participantes: chatUsers.concat([user.id]), nombre: newChatName } })}>
                                <Text>Crear</Text>
                                <Icon active name="arrow-dropright-circle" />
                            </Button>
                            :
                            <Button transparent block disabled>
                                <Text>Crear</Text>
                                <Icon active name="arrow-dropright-circle" />
                            </Button>
                    }
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
                                                return participante.username != user.username ? ' ' + participante.username : null
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
