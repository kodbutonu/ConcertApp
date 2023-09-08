import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
const Input = () => {
    const [text, setText] = useState('');

    const handleChangeText = (inputText) => {
        setText(inputText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Text style={styles.text}>Search</Text>
                <EvilIcons name="search" size={24} color="gray" />

            </View>
                 
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width:350
    },
    text:{color:"white",
       marginRight:230},
    input: {
        height:40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius:10,
        display:"flex",
        flexDirection:"row"
    },
});

export default Input;
