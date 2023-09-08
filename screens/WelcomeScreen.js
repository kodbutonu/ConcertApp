import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation(); // useNavigation fonksiyonunu çağırmayı unutmayın
    return (
        <View style={{ flex: 1,alignItems:"center"}}>
            <Image source={require("../assets/concert.png")} style={{height:400,marginTop:20,borderRadius:200,marginRight:100,width:380,marginLeft:100}} />
            <Text style={{ color: "orange", fontSize: 22, fontWeight: "bold" }}>
                40K+ Events
            </Text>
            <Text style={{ fontSize: 42, fontWeight: "bold", color: "black", marginTop: 44, marginBottom: 20 }}>Search Events</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Login")
            }} style={{ backgroundColor: "orange", borderRadius: 15, paddingVertical: 18, width: "80%", alignItems: 'center' }}>
                <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
                    Let's go
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;
