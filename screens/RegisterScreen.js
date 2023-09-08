import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import ButtonDesign from "../components/ButtonDesign";
import TextDescription from "../components/TextDescription";
import firebase from "@firebase/app-compat";


const RegisterScreen = () => {
    const navigation = useNavigation();
    const handleRegisterPress = () => {
        registerUser(email, password, firstName, lastName);
        navigation.navigate("Email")
    };
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName, setLastName] = useState("");
    const registerUser = async (email, password, firstName, lastName) => {
        try {
            // Yeni kullanıcı oluştur
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // Doğrulama e-postası gönder
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://food-5b17c.firebaseapp.com'
                    })
                        .then(() => {
                            alert('Doğrulama e-postası gönderildi');
                        })
                        .catch((error) => {
                            alert(error.message);
                        });

                    // Kullanıcı bilgilerini Firestore'a kaydet
                    firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            firstName,
                            lastName,
                            email
                        })
                        .then(() => {
                            console.log('Kullanıcı bilgileri Firestore\'a kaydedildi.');
                        })
                        .catch((error) => {
                            console.error('Firestore\'a kaydetme hatası:', error.message);
                        });
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            console.error('Kullanıcı kaydı sırasında bir hata oluştu:', error.message);
        }
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#F3F0F2",
                padding: 10,
                alignItems: "center",
            }}
        >
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Image
                        style={{ height: 140, width: 150, marginTop: 40 }}
                        source={require("../assets/logox.png")}
                    />
                </View>

                <View style={{ width: 320, marginTop: 45 ,marginLeft:20}}>
                    <Input
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="Ad"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.inputContainer}
                    />
                    <Input
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Soyad"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.inputContainer}
                        secureTextEntry={false}
                    />
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        placeholder="E-posta"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.inputContainer}
                        secureTextEntry={false}
                    />
                    <Input
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        placeholder="Şifre"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.inputContainer}
                    />
                </View>
               
                
                <Pressable
                    onPress={handleRegisterPress}
                    disabled={!input && !password}
                    style={
                        password.length > 4
                            ? {
                                marginTop:20,
                                backgroundColor: "orange",
                                 borderRadius:20,
                                 marginLeft: 20,
                                marginRight: 25
                            }
                            : {
                                marginTop: 20,
                                backgroundColor: "#DADADA ",
                                borderRadius: 20,
                                marginLeft:20,
                                marginRight:25

                            }
                    }
                >
                   
                    <ButtonDesign  text="Login" />
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
