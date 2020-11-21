import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Form, Item } from 'native-base'
import { Formik } from 'formik';
import * as yup from 'yup'
import firebase from '../database/firebase';
import DocumentPicker from 'react-native-document-picker';

const { width: WIDTH } = Dimensions.get('window')


export default function formAnuncio({ crearAnuncio, curso }) {

  //const [fileUrl, setFileUrl] = useState(null);
  const [singleFile, setSingleFile] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  }

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        console.log(err)
      } else {
        console.log(err)
        throw err;
      }
    }
  };

  const validationSchema = yup.object({
    descripcion: yup.string().required()
  })

  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        validationSchema={validationSchema}
        initialValues={{
          descripcion: ""
        }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          let anuncio = {
            descripcion: values.descripcion,
            fecha_publicacion: new Date().toISOString(),
            archivo: "",
            id_curso: parseInt(curso.id)
          };
          crearAnuncio({ variables: anuncio })
        }}
      >
        {(props) => (
          <Form>

            <TextInput
              multiline
              style={styles.input}
              placeholder='Descripcion del anuncio'
              onChangeText={props.handleChange('descripcion')}
              onBlur={props.handleBlur('descripcion')}
              value={props.values.descripcion}
            />

            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text} onPress={selectFile}>
                Añadir archivos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text} onPress={props.handleSubmit}>
                Crear anuncio
              </Text>
            </TouchableOpacity>
          </Form>
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