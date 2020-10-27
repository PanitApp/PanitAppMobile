import React, { useContext, useState } from 'react';
import { Content, Body, Text, ListItem, Left, List, Thumbnail, Icon } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_CHATS } from '../graphql/queries'
import { AuthContext } from '../context/authContext';

import grupo from '../assets/logo1.png'
import personal from '../assets/Chat.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation }) {
    const { user, logout } = useContext(AuthContext)

    const [chats, setChats] = useState([])

    const { loading, error } = useQuery(GET_CHATS, {
        variables: { userId: user.id },
        onCompleted: (data) => {
            setChats(data.getChatByUser)
        }
    })
    if (loading) return <ActivityIndicator />
    if (error) return <Text>{console.log('error', error)}</Text>

    return (
        <Content style={{ backgroundColor: 'white' }}>
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
