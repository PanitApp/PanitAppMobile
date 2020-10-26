import * as React from 'react';
import { Container, View } from 'native-base';

export default function MisCursos({ route }) {

    const { anuncio } = route.params;

    return (
        <Container>
            <View>
                <Text>
                    {anuncio.descripcion}
                </Text>
            </View>
        </Container>
    );
}