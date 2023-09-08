import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ButtonDesign = (props) => {
    return (
        <View style={[styles.button, { backgroundColor: props.color }]}>
            <Text style={{ color: props.textColor }}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        height: 60,
        width: 300,

    },
    text: {
        fontWeight: 'bold',

    },
    image: {
        height: 100,
        width: 110,
    },
});

export default ButtonDesign;
