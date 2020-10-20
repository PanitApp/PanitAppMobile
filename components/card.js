import * as React from 'react';
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text } from 'native-base';
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

export default function ScrollingCardExample() {
    return (

        <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
                <Text>Mis notas</Text>
            </CardItem>

            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem><CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </CardItem>
            <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                    <Icon name="arrow-forward" />
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