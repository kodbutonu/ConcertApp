import React, { useState } from 'react';
import { View, Image, SafeAreaView, KeyboardAvoidingView, Pressable, StyleSheet ,TouchableOpacity,Text, ImageBackground} from 'react-native';
import { Input } from 'react-native-elements';
import firebase from "@firebase/app-compat";
import { useNavigation } from "@react-navigation/native";
import ButtonDesign from '../components/ButtonDesign';
import { AntDesign } from "@expo/vector-icons";
const ProfileDetailScreen = () => {
    const navigation = useNavigation();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleUpdatePress = async () => {
        const user = firebase.auth().currentUser;

        if (user) {
            // Kullanıcı bilgilerini Firebase Authentication ile güncelle
            user.updateProfile({
                displayName: `${firstName} ${lastName}`,
                email: email,
            })
                .then(() => {
                    // Güncelleme başarılı oldu
                    alert('Bilgileriniz güncellendi.');

                    // Firestore'da kullanıcı bilgilerini güncelle
                    firebase.firestore().collection('users').doc(user.uid).update({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    })
                        .then(() => {
                            console.log('Firestore\'da kullanıcı bilgileri güncellendi.');
                        })
                        .catch((error) => {
                            console.error('Firestore\'da kullanıcı bilgilerini güncelleme hatası:', error.message);
                        });
                })
                .catch((error) => {
                    // Güncelleme sırasında hata oluştu
                    console.error('Bilgi güncelleme hatası:', error.message);
                });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.backgroundImage}
                blurRadius={200}
                source={require("../assets/back.png")}>
            <KeyboardAvoidingView behavior="padding">
               
                <View style={styles.rows}>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <AntDesign name="back" size={34} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Profile Page</Text>
                    <TouchableOpacity
                        style={styles.back}
                            onPress={handleUpdatePress}
                    >
                    
                        <AntDesign name="check" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="Ad"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.input}
                    />
                    <Input
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Soyad"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.input}
                        secureTextEntry={false}
                    />
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        placeholder="E-posta"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.input}
                        secureTextEntry={false}
                    />
                    <Input
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        placeholder="Şifre"
                        placeholderTextColor="black"
                        inputContainerStyle={styles.input}
                    />
                </View>


               
            </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F0F2",

    },
    rows: {
        flexDirection: "row",
        height: 100,
        marginLeft:30,
        marginRight:30,
        marginTop:30
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "white",
        marginRight: 30
    },
    back: {
        height: 40,
        width: 40,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
        borderRadius: 10,
        marginRight: 30
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 40,
    },
    logo: {
        height: 140,
        width: 150,
    },
    inputContainer: {
        width: 320,
        marginTop: 45,
        marginLeft: 20,
        
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 20,
    },
    input: {
        height: 60,
        borderRadius: 20,
        backgroundColor: "#DDDDDD",
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 25,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    activeButton: {
        backgroundColor: "orange",
    },
    inactiveButton: {
        backgroundColor: "#DADADA",
    },
});

export default ProfileDetailScreen;
