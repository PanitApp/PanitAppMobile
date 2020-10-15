import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Button, 
    ImageBackground, 
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import bgImage from '../assets/fondo2.jpg'
import logo from '../assets/logo1.png'

const {width: WIDTH} =Dimensions.get('window')
const {height: HEIGHT} = Dimensions.get('window')

export default function login() {
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
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={'black'}
                    secureTextEntry = {true}
                />
            </View>
            <TouchableOpacity style={styles.btnLogin}>
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
    input:{
        width: WIDTH -55,
        height: 45,
        borderRadius:25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        margin: 10,
        color: 'black',
    },
    btnLogin: {
        width: WIDTH -55,
        height: 45,
        borderRadius:25,
        backgroundColor: 'rgba(3, 151, 158, 0.65)',
        justifyContent: 'center',
        fontSize: 16,
        margin: 10
    }
})
