import * as React from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation, route }) {

    const { curso } = route.params;
    return (

        <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
                <Text>Curso Detalle!!!</Text>
            </CardItem>
            <CardItem key={curso.id}>
                <Icon active name="school" />
                <Text>
                    {curso.nombre}
                </Text>
                {console.log(curso)}
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.navigate('CursoDetalle', { curso: curso })} />
                </Right>
            </CardItem>
            <CardItem footer bordered>
                <Body>
                    <Button bordered>
                        <Text>Light</Text>
                    </Button>
                </Body>

            </CardItem>
        </Card>

    );
}