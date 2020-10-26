import {StyleSheet, Dimensions} from 'react-native'

const { width: WIDTH } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
    cardItemTitle: {
        width: 200
    },
    listItemTitle: {
        width: WIDTH-100
    }
})