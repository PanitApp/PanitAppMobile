import React, { useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, Content, Container, Input, Item, Form } from 'native-base'
import * as yup from 'yup'
import { Formik } from 'formik'
import { AuthContext } from '../context/authContext'


const { width: WIDTH } = Dimensions.get('window')

export default function FormCurso({ crearCurso }) {

    const { user } = useContext(AuthContext)

    const validationSchema = yup.object({
        nombre: yup.string().required(),
        descripcion: yup.string().required()
    })

    return (
        <View style={styles.container}>
            <Formik
                style={styles.form}
                validationSchema={validationSchema}
                initialValues={{
                    nombre: "",
                    descripcion: ""
                }}
                onSubmit={(values, actions) => {
                    actions.resetForm()
                    let curso = { nombre: values.nombre, descripcion: values.descripcion, profesor: user.id }
                    crearCurso({ variables: curso })
                }}
            >
                {props => (
                    <Form>

                        <Item>
                            <Input placeholder="Nombre"
                                onChangeText={props.handleChange('nombre')}
                                onBlur={props.handleBlur('nombre')}
                                // style={styles.input}
                            />
                        </Item>
                        <Text style={styles.errorMessage}>{props.touched.nombre && props.errors.nombre}</Text>

                        <Item>
                            <Input placeholder="Descripción"
                                onChangeText={props.handleChange('descripcion')}
                                onBlur={props.handleBlur('descripcion')}
                                // style={styles.input}
                            />
                        </Item>
                        <Text style={styles.errorMessage}>{props.touched.descripcion && props.errors.descripcion}</Text>


                        <Button block onPress={props.handleSubmit} style={{ margin: 30, backgroundColor: "#037E85" }}>
                            <Text style={styles.text}>
                                Crear
                            </Text>
                        </Button>
                    </Form>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: WIDTH,
        margin: 0,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        backgroundColor:'yellow'
    },
    errorMessage: {
        color: 'red',
        width: WIDTH,
        marginLeft: 10
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
