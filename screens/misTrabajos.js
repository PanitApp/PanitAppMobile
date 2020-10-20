import React, { useState } from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, View } from 'native-base';
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_PUBLICACIONES_BY_USER } from '../graphql/queries'

const { width: WIDTH } = Dimensions.get('window')

export default function MisTrabajos({navigation}) {

    const [trabajos, setTrabajos] = useState([])

    const { loading } = useQuery(GET_PUBLICACIONES_BY_USER, {
        onCompleted: (data) => {
            setTrabajos(data.getCursosByEstudiante.cursos.publicaciones)
        },
        onError: (err) => {
            console.log("Ocurrio un error: "+ err)
        },
        fetchPolicy: "no-cache"
    })

    //if (loading){return (<Text> Loading ...</Text>)}
    return (
        <View style={{  marginLeft:30, width: WIDTH - 60 }}>
            <Card>

                <CardItem header bordered>
                    <Icon active name="checkmark-circle" style={{ color: 'red' }} />
                    <Text>Vencidos</Text>
                </CardItem>
                <CardItem>
                    <Icon active name="logo-googleplus" />
                    <Text>Implementar el AES-128</Text>
                    <Right>
                        <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
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

            <Card>
                <CardItem header bordered>
                    <Icon active name="checkmark-circle" style={{ color: 'gray' }} />
                    <Text>Pendientes</Text>
                </CardItem>
                <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            </Card>

            <Card>
                <CardItem header bordered>
                    <Icon active name="checkmark-circle" style={{ color: 'orange' }} />
                    <Text>Entregados</Text>
                </CardItem>
                <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            </Card>

            <Card>
                <CardItem header bordered>
                    <Icon active name="checkmark-circle" style={{ color: 'green' }} />
                    <Text>Revisados</Text>
                </CardItem>
                <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Implementar el AES-128</Text>
                <Right>
                    <Icon name="arrow-forward" onPress={() => navigation.push('TrabajoDetalle')}/>
                </Right>
            </CardItem>
            </Card>

        </View>
    );
}