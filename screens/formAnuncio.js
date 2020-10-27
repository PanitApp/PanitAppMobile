import React from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'

const { width: WIDTH } = Dimensions.get('window')

export default function formAnuncio({ crearAnuncio, curso }) {

  const validationSchema = yup.object({
    descripcion: yup.string().required()
  })

  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        validationSchema={validationSchema}
        initialValues={{
          descripcion: "",
          archivos: "archivos"
        }}
        onSubmit={ async (values, actions) => {
          actions.resetForm();
          let anuncio = {
            descripcion: values.descripcion, 
            fecha_publicacion: "2020-10-01T00:00:00.000Z",
            archivo: "xd",
            id_curso: curso.id 
          };
          console.log(anuncio)
          await crearAnuncio({ variables: anuncio })
        }}
      >
        {(props) => (
          <View>
            <TextInput
              multiline
              style={styles.input}
              placeholder='Descripcion del anuncio'
              onChangeText={props.handleChange('descripcion')}
              onBlur={props.handleBlur('descripcion')}
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
    justifyContent: 'center',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 150,
    margin: 20
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#037E85',
    justifyContent: 'center',
    fontSize: 16,
    margin: 5
  }
})