import React from 'react'
import {StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { useQuery } from '@apollo/client';
import { HI } from '../graphql/queries'

export default function login() {
    const { loading, error, data } = useQuery(HI)
    
    if (loading) return <Text>loading...</Text>
    if (error) return <Text>Error :(</Text>

    return (
        <View>
            <View style={styles.container} >
                <Text>{data.Hi}</Text>

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
