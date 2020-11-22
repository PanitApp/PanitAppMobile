import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Form, Spinner } from 'native-base'
import { Formik } from 'formik';
import * as yup from 'yup'
import firebase from '../database/firebase';
import * as DocumentPicker from 'expo-document-picker';
const { width: WIDTH } = Dimensions.get('window')


export default function formAnuncio({ crearAnuncio, curso }) {

  const [singleFile, setSingleFile] = useState("");
  const [FileName, setFileName] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileProgress, SetFileProgress] = useState(0.0);

  const selectFile = async () => {
    setLoadingFile(true)
    // Opening Document Picker to select one file
    const res = await DocumentPicker.getDocumentAsync({})
    if (res.type == "success"){
      // This is to get the blob of the file  
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          setLoadingFile(false)
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', res.uri, true);
        xhr.send(null);
      });

      // this is to send the file to firebase
      const ref = firebase
        .storage()
        .ref()
        .child(res.name);
      const uploadTask = ref.put(blob)

      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        SetFileProgress(progress)
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        setFileName("")
        setLoadingFile(false)
        SetFileProgress(0)
        console.log(error)
      }, function() {
        // Handle successful uploads on complete
        blob.close();
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setLoadingFile(false)
          setSingleFile(downloadURL)
          setFileName(res.name)
          Alert.alert("Archivo subido correctamente!")
        });
      });
    }else{
      setLoadingFile(false)
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
            archivo: singleFile,
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
            {loadingFile?(
              <View> 
                <Spinner />
                <Text>Subiendo archivo: {fileProgress}</Text>
              </View> 
            ):(
              <View>
                <Text>{FileName}</Text>
                <TouchableOpacity style={styles.btnLogin}>
                  <Text style={styles.text} onPress={selectFile}>
                    Añadir archivo
                  </Text>
                  {/* <Icon name="upload" style={{ color: '#037E85' }} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} disabled={loadingFile}>
                  <Text style={styles.text} onPress={props.handleSubmit}>
                    Crear anuncio
                  </Text>
                </TouchableOpacity>
              </View>
            )}

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