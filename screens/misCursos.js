import React, { useContext, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'
import { CursosContext } from '../context/cursosContext';

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation }) {
    const { cursos } = useContext(CursosContext)
    return (

        <Content>
            <Card style={{ width: WIDTH - 60 }}>
                <CardItem header bordered>
                    <Text>Mis notas</Text>
                </CardItem>

                {
                    cursos.filter(curso => curso != null).map((curso, index) => {
                        return curso != null ?
                            <CardItem key={curso.id}>
                                <Icon active name="school" />
                                <Text>
                                    {curso.nombre}
                                </Text>
                                <Right>
                                    <Icon name="arrow-forward" onPress={() => navigation.navigate('CursoDetalle', {curso: curso})} />
                                </Right>
                            </CardItem>
                            : null
                    })
                }

                <CardItem footer bordered>
                    <Body>
                        <Button bordered>
                            <Text>Light</Text>
                        </Button>
                    </Body>

                </CardItem>
            </Card>
        </Content>

    );
}