import * as React from 'react';
import { Container, Tab, Tabs } from 'native-base';


import InfoCurso from './infoCurso'
import EstudiantesCurso from './estudiantesCurso'
import AnunciosCurso from './anunciosCurso'
 
export default function MisCursos({ navigation, route }) {

    const { curso } = route.params;
    return (
        <Container>
        <Tabs tabBarPosition='bottom'>
          <Tab heading="Información" tabStyle={{backgroundColor: '#03979E'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#037E85'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <InfoCurso curso={curso}/>
          </Tab>
          <Tab heading="Anuncios" tabStyle={{backgroundColor: '#03979E'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#037E85'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <AnunciosCurso curso = {curso}/>
          </Tab>
          <Tab heading="Estudiantes" tabStyle={{backgroundColor: '#03979E'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#037E85'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <EstudiantesCurso curso = {curso}/>
          </Tab>
        </Tabs>
      </Container>
    );
}