import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../graphql/mutations';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from '../context/authContext';
import { Content } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';

import bgImage from '../assets/fondo.jpg'
import logo from '../assets/Calendario.png'

const { width: WIDTH } = Dimensions.get('window')

const usuarioSchema = yup.object({
    nombre_usuario: yup.string().required().max(16),
    password: yup.string().required().min(8),
    nombres: yup.string().required(),
    email: yup.string().required().email("invalid email"),
    rol: yup.number().required()
})

export default function MisDatos({ navigation }) {

    const { user, setUser } = useContext(AuthContext)
    console.log(user)
    const [editUser] = useMutation(EDIT_USER, {
        onCompleted: (data) => {
            console.log(data)
            setOpenModal(false)
            setUser(data.actualizarUsuario)
            navigation.navigate('Inicio')
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <Content>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}>
                    </Image>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <Formik
                            initialValues={{
                                contrasena: user.password,
                                nombres: user.nombres,
                                email: user.email,
                                rol: user.rol.id,
                                nombre_usuario: user.nombre_usuario
                            }}
                            onSubmit={(values) => {
                                let user = {
                                    nombre_usuario: user.nombre_usuario,
                                    password: values.password,
                                    nombres: values.nombres,
                                    email: values.email,
                                    rol: user.rol.id
                                }
                                console.log(values)
                                editUser({ values: { id: user.rol.id, usuario: user } });
                            }}

                        >
                            {(props) => (
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nombres"
                                        placeholderTextColor={'black'}
                                        onChangeText={props.handleChange('nombres')}
                                        value={props.values.nombres}
                                        onBlur={props.handleBlur('nombres')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.nombres && props.errors.nombres}</Text>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor={'black'}
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        onBlur={props.handleBlur('email')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.email && props.errors.email}</Text>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Contraseña"
                                        placeholderTextColor={'black'}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.password && props.errors.password}</Text>
                                    <Text style={styles.errorRegistro}>{props.touched.rol && props.errors.rol}</Text>
                                    <TouchableOpacity style={styles.btnRegistro} onPress={props.handleSubmit}>
                                        <Text style={styles.text}>
                                            Guardar cambios
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnRegistro} onPress={() => navigation.navigate('Inicio')}>
                                        <Text style={styles.text}>
                                            Descartar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>
                </TouchableWithoutFeedback>
            </Content>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: WIDTH,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    logoContainer: {
        alignItems: 'center',
        margin: 5
    },
    logo: {
        width: 175,
        height: 100,
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
        margin: 2,
        color: 'black',
        marginBottom: 0
    },
    inputAndroid: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        margin: 10,
        color: 'black',
        marginBottom: 0
    },
    btnRegistro: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        justifyContent: 'center',
        fontSize: 16,
        margin: 5
    },
    btnLogin: {
        color: 'black',
        textAlign: 'center',
        margin: 10,
    },
    textLogin: {
        color: 'rgba(3, 151, 158, 0.65)',
    },
    errorRegistro: {
        color: 'crimson',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft: 20,
    }
})
