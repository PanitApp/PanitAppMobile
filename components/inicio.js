// In App.js in a new project

import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../context/authContext'
import { CursosContext } from '../context/cursosContext'
import { Container, Header, Content, Card, CardItem, Icon, Right, Body, Button, Text, Left, Title } from 'native-base';

import { Col, Row, Grid } from "react-native-easy-grid";

import { DrawerActions } from '@react-navigation/native';
import logo from '../assets/logo1.png';

import { useQuery } from '@apollo/client';
import { HI, GET_CURSOS, GET_CURSOS_BY_ESTUDIANTE, GET_CURSOS_BY_PROFESOR } from '../graphql/queries'

const { width: WIDTH } = Dimensions.get('window');

import Menu from './menu'

import { globalStyles } from '../styles/globalStyles'
import RNRestart from 'react-native-restart';


export default function HomeScreen({ navigation }) {

  const { user, logout } = useContext(AuthContext)
  const { cursos, setCursos } = useContext(CursosContext)

  return (
    <Content>
      <Menu navigation={navigation} />
      <View style={styles.backgroundColor}>
        <View style={{ backgroundColor: 'white', width: WIDTH - 30, alignItems: 'center', flex: 1 }}>
          <Text style={styles.title}>¡ Bienvenido !</Text>
          
          <Image source={logo} style={styles.logo}></Image>

          <Text>{user.nombres}</Text>
          <Text>{user.rol.nombre}</Text>

          {/* CURSOS */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis cursos</Text>
            </CardItem>
            {
              cursos.filter(curso => curso != null).map((curso, index) => {
                return index < 5 && curso != null ?
                  <CardItem key={curso.id}>
                    <Icon active name="school" style={{color:'#013d40'}}/>
                    <Text style={globalStyles.cardItemTitle}>
                      {curso.nombre}
                    </Text>
                    <Right>
                      <Icon name="arrow-round-forward" style={{color: '#037E85'}} onPress={() => navigation.navigate('CursoDetalle', { curso: curso })}/>
                    </Right>
                  </CardItem>
                  : null
              })
            }

            <CardItem footer bordered>
              <Body>
                <Button transparent onPress={() => navigation.dispatch(DrawerActions.jumpTo('Mis cursos', { cursos: cursos }))}>
                  <Text style={styles.cardTitle}>Ver todos mis cursos</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          {/* NOTAS, VERDE: success, NARANJA: warning, ROJO: danger */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis notas</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button rounded small success>
                  <Text>4.5</Text>
                </Button>
              </Left>
              <Body>
                <Text>Nota trabajo X</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Body>
                <Button transparent >
                  <Text style={styles.cardTitle}>Ver todas mis notas</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          {/* TRABAJOS */}
          <Card style={{ width: WIDTH - 60 }}>
            <CardItem header bordered>
              <Text style={styles.cardTitle}>Mis trabajos</Text>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'red' }} />
              <Text>Pendiente</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'green' }} />
              <Text>Revisado</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem >
              <Icon active name="checkmark-circle" style={{ color: 'orange' }} />
              <Text>Entregado</Text>
              <Right >
                <Icon name="arrow-round-forward" />
              </Right>
            </CardItem>
            <CardItem footer bordered>
              <Body>
                <Button transparent >
                  <Text style={styles.cardTitle}>Ver todos mis trabajos</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

        </View>
      </View>
    </Content>
  );
}


const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: '#03979E',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#03979e',
    paddingTop: 30,
    fontSize: 40,
  },
  logo: {
    width: WIDTH - 90,
    height: 150,
    margin: 20,
  },
  cardTitle: {
    color: '#037E85',
  }
})