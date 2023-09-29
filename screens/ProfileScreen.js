import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Pressable, ScrollView, StyleSheet } from 'react-native';
import firebase from "@firebase/app-compat";
import { AntDesign } from "@expo/vector-icons";
import ButtonDesign from '../components/ButtonDesign';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const user = firebase.auth().currentUser;

        if (user) {
            firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        setUserData(doc.data());
                    } else {
                        console.log('Kullanıcı verisi bulunamadı.');
                    }
                })
                .catch((error) => {
                    console.error('Kullanıcı verisini çekerken hata oluştu:', error);
                });
        }
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                blurRadius={200}
                source={require("../assets/back.png")}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.ro}>
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
                                onPress={() => navigation.navigate("Home")}
                            >
                                <AntDesign name="setting" size={34} color="white" />
                            </TouchableOpacity>
                        </View>
                        {userData && (
                            <View>
                                <Text style={styles.title}>{userData.firstName} {userData.lastName}</Text>
                                <Text style={styles.description}>E-posta: {userData.email}</Text>
                                {/* Diğer kullanıcı bilgilerini burada görüntüleyebilirsiniz */}
                            </View>
                        )}
                        <Pressable
                            onPress={() => navigation.navigate("Home")}
                            style={{
                                marginTop: 20,
                                backgroundColor: "cyan",
                                borderRadius: 20,
                                height: 50,
                                width: 150,
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 50
                            }}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate("ProfileDetail")}>
                            <ButtonDesign text="Edit Profile" />
                            </TouchableOpacity>
                           
                        </Pressable>
                    </View>
                    <View style={styles.profiledesign}>
                        <TouchableOpacity>
                            <View style={styles.row}>
                                <MaterialIcons name="favorite-outline" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Favorites</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <AntDesign name="download" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Download</Text>
                                </View>

                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <FontAwesome name="language" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Language</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <FontAwesome name="location-arrow" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Location</Text>
                                </View>

                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <MaterialIcons name="subscriptions" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Subscription</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <AntDesign name="delete" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Delete</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <FontAwesome name="history" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>History</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.as}></View>
                        <TouchableOpacity onPress={() => firebase.auth().signOut()} style={{ marginBottom: 10 }}>
                            <View style={styles.row}>
                                <AntDesign name="logout" size={34} color="white" />
                                <View style={styles.texth}>
                                    <Text style={styles.det}>Log out</Text>
                                </View>
                                <AntDesign name="right" size={34} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    as: {
        height: 1.5,
        width: 320,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 15
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 20,
    },
    det: {
        marginRight: 150,
        marginLeft: 10,
        fontSize: 20,
        color: "white",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "white",
        marginRight: 30
    },
    texth: {
        width: 260,
        height: 30
    },
    description: {
        fontSize: 14,
        fontWeight: "bold",
        color: "orange",
        marginRight: 50
    },
    row: {
        flexDirection: "row",
        
    },
    rows: {
        flexDirection: "row",
        height: 100,
        
    },
    ro: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 30,
        marginBottom: 0,
        paddingVertical: 20,
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
    profiledesign: {
        marginLeft: 20
    }
});

export default ProfileScreen;
