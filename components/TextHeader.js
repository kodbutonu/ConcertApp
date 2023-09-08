import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const TextHeader = (props) => {
    return (
        <Text style={styles.text}>{props.text}</Text>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold'
    }
})
export default TextHeader