import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

const { width: WIDTH } = Dimensions.get('window')
/*
CREAR ANUNCIO
-descripción
fecha (auto)
-archivos
*/

export default function formAnuncio({ crearAnuncio }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          descripcion: '',
          archivos: ''
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          let anuncio = {descripcion:values.descripcion, fecha_publicacion:new Date().toISOString(), archivos:values.archivos, id_curso: values.id_curso}
          crearAnuncio({variables: anuncio})
          console.log(values)
        }}
      >
        {(props) => (
          <View>
            <TextInput
              multiline
              style={styles.input}
              placeholder='Descripcion del anuncio'
              onChangeText={props.handleChange('descripcion')}
              value={props.values.descripcion}
            />
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text}>
                Añadir archivos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text} onPress={props.handleSubmit}>
                Crear anuncio
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    marginHorizontal: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 150
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(3, 151, 158, 0.65)',
    justifyContent: 'center',
    fontSize: 16,
    margin: 10
  }
})