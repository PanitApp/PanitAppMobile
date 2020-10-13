import React from 'react'
import {StyleSheet, View, Text, TextInput, Button } from 'react-native'

export default function login() {
    return (
        <View>
            <View style={styles.container} >
                <View style={styles.title} >
                    <Text>Iniciar Sesion</Text>            
                </View>
                <View style={styles.form} >
                    <TextInput placeholder="username"/>
                    <TextInput placeholder="password"/>
                    <Text>¿Ayuda?</Text>
                    <Button title="Login" />          
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title:{

    }
})
