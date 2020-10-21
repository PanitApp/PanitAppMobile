import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, Dimensions, Button, Alert, TouchableOpacity,
 TouchableWithoutFeedback, Keyboard} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../context/authContext';
import { Formik } from 'formik';
import * as yup from 'yup';

import bgImage from '../assets/fondo2.jpg'
import logo from '../assets/logo1.png'

const { width: WIDTH } = Dimensions.get('window')


const usuarioSchema = yup.object({
    nombre_usuario: yup.string().required().max(16),
    password: yup.string().required().min(8),
    nombres: yup.string().required(),
    email: yup.string().required().email("invalid email"),
    rol: yup.number().required()
})

export default function Registro( {navigation} ){
    
    const { register }  = useContext(AuthContext)
    
    const roles = [
        {label: 'Profesor', value: 1},
        {label: 'Estudiante', value: 2}
    ]
    
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}>
                </Image>
            </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <Formik
                            initialValues={{nombre_usuario: "",
                                password: "", 
                                nombres: "", 
                                email: "", 
                                rol: ""
                            }}
                            validationSchema={usuarioSchema}
                            onSubmit={ async (values) => {
                                await register(values)
                            }}
                        >
                            {(props) => (
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nombre"
                                        placeholderTextColor={'black'}
                                        onChangeText={props.handleChange('nombres')}
                                        value={props.values.nombres}
                                        onBlur={props.handleBlur('nombres')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.nombres && props.errors.nombres}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Usuario"
                                        placeholderTextColor={'black'}
                                        onChangeText={props.handleChange('nombre_usuario')}
                                        value={props.values.nombre_usuario}
                                        onBlur={props.handleBlur('nombre_usuario')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.nombre_usuario && props.errors.nombre_usuario}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="email"
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
                                    <RNPickerSelect
                                        placeholder={{label: "Seleccione su rol", value: ""}}
                                        style={styles}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(val) => {props.setFieldValue("rol", val)}}
                                        items={roles}
                                        onBlur={props.handleBlur('rol')}
                                    />
                                    <Text style={styles.errorRegistro}>{props.touched.rol && props.errors.rol}</Text>
                                    <TouchableOpacity style={styles.btnRegistro} onPress={props.handleSubmit}>
                                        <Text style={styles.text}>
                                            Crear cuenta 
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>
                </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textLogin}>
                            ¿Tienes cuenta? Inicia sesión
                        </Text>
                    </TouchableOpacity>
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
        margin: 10
    },
    logo: {
        width: 300,
        height: 120,
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
        margin: 10,
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
