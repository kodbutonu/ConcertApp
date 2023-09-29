import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import ButtonDesign from "../components/ButtonDesign";
import TextDescription from "../components/TextDescription";
import { firebase } from "../FirebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const EmailScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null); // Kullanıcı bilgisi için state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
               
                navigation.navigate("Home");
                alert("Giriş Başarılı");

            }
            setLoading(false);
            
        })

        return () => unsubscribe();
    }, []);

    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with", user.email);
            })
            .catch((error) => {
                alert("Hesap Bulunamadı.");
            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        style={{ height: 150, width: 180, marginTop: 40 }}
                        source={require("../assets/logox.png")}
                    />
                </View>

                <View style={{ width: 320, marginTop: 45, marginLeft: 20 }}>
                    {/* Giriş bilgileri için Input bileşenleri */}
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

                {/* Giriş yap düğmesi */}
                <Pressable
                    onPress={signIn}
                    style={
                        email && password
                            ? {
                                marginTop: 20,
                                backgroundColor: "orange",
                                borderRadius: 20,
                                marginLeft: 20,
                                marginRight: 25,
                            }
                            : {
                                marginTop: 20,
                                backgroundColor: "#DADADA ",
                                borderRadius: 20,
                                marginLeft: 20,
                                marginRight: 25,
                            }
                    }
                >
                    <ButtonDesign text="Giriş Yap" />
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EmailScreen;

const styles = StyleSheet.create({});
