import * as React from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'

const { width: WIDTH } = Dimensions.get('window')

export default function MisCursos({ navigation, props }) {
    const { loading, error, data } = useQuery(GET_CURSOS_BY_PROFESOR, { variables: { id_profesor: 1 } })
    if (loading) return <Text>loading...</Text>
    if (error) return <Text>{console.log('error', error)}</Text>

    return (

        <Content>
            <Card style={{ width: WIDTH - 60 }}>
                <CardItem header bordered>
                    <Text>Mis notas</Text>
                </CardItem>

                {
                    data.getCursosByProfesor.filter(curso => curso != null).map((curso, index) => {
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