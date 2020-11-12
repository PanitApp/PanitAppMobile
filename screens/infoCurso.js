import * as React from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, Dimensions, Image, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import logo from '../assets/Cursos.png'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos(props) {
    return (

        <Container>
            <Content>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>{props.curso.nombre}</Text>
                </View>
                <Card style={{ width: WIDTH }} transparent>
                    <CardItem >
                        <Text style={styles.texto}>{props.curso.descripcion}</Text>
                    </CardItem>
                </Card>
            </Content>
        </Container>

    );
}


const styles = StyleSheet.create({

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