import { View, Text, Button, StyleSheet, StatusBar, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDesign from "../components/ButtonDesign";
import Line from "../components/Line";
import TextDescription from "../components/TextDescription";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ width: "100%", height: 500, marginTop: 80 }}>
            <StatusBar style="auto" />

            <View style={styles.logo}>
                <Image
                    style={styles.image}
                    source={require("../assets/logox.png")}
                ></Image>
            </View>
            <View>
                <Text style={styles.text}>Sign up to continue</Text>
                <View style={styles.button}>
                    <Pressable onPress={() => navigation.navigate("Otp")}><ButtonDesign color="orange" text="Use phone number" /></Pressable>

                </View>

                <View style={{marginLeft:50}}>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <ButtonDesign color="white" text="Continue with email" />
                </Pressable>
                    
                </View>
                <View style={{marginRight:30}}>
                    <Pressable onPress={() => navigation.navigate("Email")}>
                        <ButtonDesign  text="If you have a account" />
                    </Pressable>
                </View>
                <View style={styles.line}>
                    <Line />
                    <TextDescription text={<Text>Privacy Policy</Text>} />
                    <Line />
                </View>
                <View style={styles.google}>
                    <AntDesign name="google" size={24} color="orange" />
                </View>
            </View>
            <View style={styles.textDesign}>
                <TextDescription text={<Text>Privacy Policy</Text>} color='orange' />
                <TextDescription text={<Text>Terms of use</Text>} color='orange' />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    line: {
        marginLeft: 45,
        marginRight: 45,
        alignItems: "center",
        textAlign: "center",
        height: 20,
        marginTop: 40,
        display: "flex",
        flexDirection: "row",
    },
    logo: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    image: {
        marginTop: 100,
        height: 150,
        width: 110,
        marginBottom: 230,
    },
    textDesign: {
        marginTop: 40,
        marginLeft: 45,
        marginRight: 45,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        marginBottom: 20,
       marginLeft:50

    },
    text: {
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        fontSize: 24,
        color: "black",
    },
    alt: {
        color: "orangeF27121",
        fontWeight: "bold",
        marginTop: 30,
        textAlign: "center",
    },
    google: {
        marginTop: 40,
        marginLeft: 160,
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "orangeE8E6EA",
    },
});

export default LoginScreen;
