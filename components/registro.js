import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, Dimensions, Button, Alert, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../context/authContext'

import bgImage from '../assets/fondo2.jpg'
import logo from '../assets/logo1.png'

const { width: WIDTH } = Dimensions.get('window')

export default function Registro( {navigation} ){
    const [usuario, setUsuario] = useState({
        nombre_usuario: "",
        password: "",
        nombres: "",
        email: "",
        rol: ""
    })
    
    const { register }  = useContext(AuthContext)
    
    const roles = [
        {label: 'Profesor', value: 1, key: 1},
        {label: 'Estudiante', value: 2, key: 2}
    ]

    const submitRegistro = async () => {
        if ((usuario.nombre_usuario && usuario.password && usuario.nombres && usuario.email && usuario.rol) ==  "" ) {
            Alert.alert('Ops!', 'Por favor complete todos los campos');
            return;
        }
        await register(usuario)
    }

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}>
                </Image>
            </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        placeholderTextColor={'black'}
                        onChangeText={(val) => setUsuario({...usuario, nombres:val})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor={'black'}
                        onChangeText={(val) => setUsuario({...usuario, nombre_usuario:val})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        onChangeText={(val) => setUsuario({...usuario, email:val})}
                        placeholderTextColor={'black'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor={'black'}
                        onChangeText={(val) => setUsuario({...usuario, password:val})}
                        secureTextEntry={true}
                    />
                    <RNPickerSelect
                        placeholder={{label: "Seleccione su rol", value: ""}}
                        style={styles}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(val) => setUsuario({...usuario, rol:val})}
                        items={roles}
                    />
                </View>
                    <TouchableOpacity style={styles.btnRegistro} onPress={submitRegistro}>
                        <Text style={styles.text}>
                            Crear cuenta
                        </Text>
                    </TouchableOpacity>
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
    },
    inputAndroid: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        margin: 10,
        color: 'black'
    },
    btnRegistro: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        justifyContent: 'center',
        fontSize: 16,
        margin: 10
    },
    btnLogin: {
        color: 'black',
        textAlign: 'center',
        margin: 10,
    },
    textLogin: {
        color: 'rgba(3, 151, 158, 0.65)',
    }
})
