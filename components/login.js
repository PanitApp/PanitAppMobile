import React, { useState, useContext } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import bgImage from '../assets/fondo2.jpg'
import logo from '../assets/logo1.png'
import { AuthContext } from '../context/authContext'

const { width: WIDTH } = Dimensions.get('window')

export default function Login() {
    const [usuario, SetUsuario] = useState({
        username: "",
        password: "",
    })

    const { login }  = useContext(AuthContext)
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}>
                </Image>
            </View>
            <View style={styles.form} >
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor={'black'}
                    onChangeText={(val) => SetUsuario({...usuario, username:val})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    onChangeText={(val) => SetUsuario({...usuario, password:val})}
                />
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={() => login(usuario.username, usuario.password)}>
                <Text style={styles.text}>
                    Iniciar sesión
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
