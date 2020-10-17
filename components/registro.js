import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, Dimensions, Button } from 'react-native';

import bgImage from '../assets/fondo2.jpg'
import logo from '../assets/logo1.png'

const { width: WIDTH } = Dimensions.get('window')


export default function registro(){
    const [usuario, setUsuario] = useState({
        nombre_usuario: "",
        password: "",
        nombres: "jose",
        email: "",
        rol: ""
    })

    const handlerUsuario = (e) => {
        console.log(e)
        //e.preventDefault();
        setUsuario({
            ...usuario,
            //[e.target.name]: e.target.value
        })
    }
    const submitRegistro = () => {
        console.log("Usuario creado")
        console.log(usuario)
    }
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}>
                </Image>
            </View>
                <Text style={styles.text}>Crear una cuenta</Text>
                    <View style={styles.form} >
                        <TextInput
                            name="nombres"
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor={'black'}
                            //value={usuario.nombres}
                            onChangeText={handlerUsuario}
                        />
                        <TextInput
                            name="nombre_usuario"
                            style={styles.input}
                            placeholder="Usuario"
                            placeholderTextColor={'black'}
                            onChangeText={handlerUsuario}
                        />
                        <TextInput
                            name="email"
                            style={styles.input}
                            placeholder="email"
                            onChangeText={handlerUsuario}
                            placeholderTextColor={'black'}
                        />
                        <TextInput
                            name="password"
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor={'black'}
                            onChangeText={handlerUsuario}
                            secureTextEntry={true}
                        />
                        <TextInput
                            name="rol"
                            style={styles.input}
                            placeholder="Rol"
                            onChangeText={handlerUsuario}
                            placeholderTextColor={'black'}
                        />
                    </View>
                <Button title="Crear cuenta" onPress={submitRegistro}></Button>
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
