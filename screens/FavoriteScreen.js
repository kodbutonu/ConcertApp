import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import { useFavorites } from "../context/FavoriteContext"; // Favori kancasının yolunu doğru şekilde belirtin
import { MaterialIcons } from "@expo/vector-icons"; // Çıkarma simgesi için gerekli olan ikonları içe aktarın
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "@firebase/app-compat"; // Firebase Firestore bağlantısını ekleyin

const FavoriteEventsList = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const navigation = useNavigation();
    const images = {
        z: require("../assets/z.png"),
        x: require("../assets/x.png"),
        i: require("../assets/i.png"),
        ı: require("../assets/ı.png"),
        w: require("../assets/w.png"),
        r: require("../assets/r.png"),
        g: require("../assets/g.png"),
        f: require("../assets/f.png"),
    };

    function randomImageFileName() {
        const imageFileNames = Object.keys(images);
        const randomIndex = Math.floor(Math.random() * imageFileNames.length);
        return imageFileNames[randomIndex];
    }

    const handleRemoveFavorite = (item) => {
        const user = firebase.auth().currentUser;

        if (user) {
            // Firestore'da kullanıcının favori etkinliklerini güncelle
            firebase.firestore().collection('users').doc(user.uid).update({
                favorites: firebase.firestore.FieldValue.arrayRemove(item),
            })
                .then(() => {
                    // Favori etkinliği başarıyla kaldırıldı
                    toggleFavorite(item);

                    // Favori etkinliği Firestore koleksiyonundan da kaldır
                    firebase.firestore().collection('favorites').doc(item.id).delete()
                        .then(() => {
                            console.log('Favori etkinlik Firestore koleksiyonundan kaldırıldı.');
                        })
                        .catch((error) => {
                            console.error('Favori etkinliği Firestore koleksiyonundan kaldırma hatası:', error.message);
                        });
                })
                .catch((error) => {
                    console.error('Favori etkinliği kaldırma hatası:', error.message);
                });
        }
    };

    const handleAddFavorite = (item) => {
        const user = firebase.auth().currentUser;

        // Kullanıcının favori etkinliklerini kendi belgesine ekleyin
        if (user) {
            // Firestore'da kullanıcının belgesini alın
            const userDoc = firebase.firestore().collection('users').doc(user.uid);

            // Kullanıcının favori etkinliklerini güncelle
            userDoc.update({
                favorites: firebase.firestore.FieldValue.arrayUnion(item),
            })
                .then(() => {
                    console.log('Kullanıcının favori etkinlikleri güncellendi.');
                    toggleFavorite(item);
                })
                .catch((error) => {
                    console.error('Kullanıcının favori etkinliklerini güncelleme hatası:', error.message);
                });
        }
    };



    const renderEventItem = ({ item }) => (
        <View style={styles.eventContainer}>
            <View style={styles.favoriteList}>
                <Image
                    source={images[randomImageFileName()]}
                    style={styles.eventImage}
                />
                <View style={styles.text3}>
                    <Text style={styles.text2}>{item.title}</Text>
                </View>

                <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
                    <MaterialIcons
                        name="remove-circle"
                        size={24}
                        color="red"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleAddFavorite(item)}>
                    <MaterialIcons name="save" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <ImageBackground
            style={styles.backgroundImage}
            blurRadius={200}
            source={require("../assets/back.png")}
        >
            <View style={styles.favorite}>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.back}
                        onPress={() => navigation.navigate("Home")}>
                        <AntDesign name="back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>List</Text>
                <FlatList
                    data={favorites}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderEventItem}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    head: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 270
    },
    backgroundImage: {
        height: 1000,
    },
    text2: {
        fontSize: 10,
        fontWeight: "bold",
        color: "cyan",
        marginRight: 5,
    },
    favorite: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "white",
        marginLeft: 150,
        marginBottom: 20
    },
    back: {
        height: 40,
        width: 40,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 15,
        marginRight: 10,
    },
    container: {
        height: 1200,
        width: 500,
    },
    favoriteList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    eventContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
    },
    text3: {
        height: 20,
        width: 250,
        marginTop: 5,
    },
    eventImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
    },
});

export default FavoriteEventsList;
