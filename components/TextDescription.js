import { View, Text } from 'react-native'
import React from 'react'

const TextDescription = (props) => {
    return (
        <View>
            <Text style={{ color: props.color }}>{props.text}</Text>
        </View>
    )
}

export default TextDescription