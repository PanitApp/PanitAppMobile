import React, { useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import { AuthContext } from '../context/authContext'


const { width: WIDTH } = Dimensions.get('window')

export default function FormCurso({ crearCurso }) {
    
    const { user }  = useContext(AuthContext)
    
    const validationSchema = yup.object({
        nombre: yup.string().required(),
        descripcion: yup.string().required()
    })

    return (
        <View>
            <Formik
                style={styles.form}
                validationSchema={validationSchema}
                initialValues={{
                    nombre: "",
                    descripcion: ""
                }}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                    let curso = {nombre:values.nombre, descripcion:values.descripcion, profesor: user.id}
                    crearCurso({ variables: curso })
                }}
            >
                {props => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor={'gray'}
                            onChangeText={props.handleChange('nombre')}
                            onBlur={props.handleBlur('nombre')}
                        />
                        <Text style={styles.errorMessage}>{props.touched.nombre && props.errors.nombre}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Descripción"
                            placeholderTextColor={'gray'}
                            onChangeText={props.handleChange('descripcion')}
                            onBlur={props.handleBlur('descripcion')}
                        />
                        <Text style={styles.errorMessage}>{props.touched.descripcion && props.errors.descripcion}</Text>

                        <TouchableOpacity style={styles.btn} onPress={props.handleSubmit}>
                            <Text style={styles.text}>
                                Crear
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )   
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        width: WIDTH,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        color: 'black',
        textAlign: 'center',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        margin: 10,
        color: 'black',
    },
    btn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        justifyContent: 'center',
        fontSize: 16,
        margin: 10
    },
    errorMessage: {
        color:'red'
    }
})
