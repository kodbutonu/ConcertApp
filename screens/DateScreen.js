import React from "react";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import SwipeButton from "../components/SwipeButton";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const DateScreen = ({ route }) => {
    const navigation = useNavigation();
    const { events } = route.params;
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
    return (
        <View style={styles.container}>
            <ImageBackground
                source={images[randomImageFileName()]} // Resim dosyasını nesneden alın
                blurRadius={1.2}
                style={styles.image}
            >
                <View style={styles.conton}>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <AntDesign name="back" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.headerEvent}>
                        <View style={styles.circle}></View>
                        <Text style={styles.text2}>Popular Events</Text>
                    </View>
                    <View style={styles.a}>
                        <Text style={styles.title}>{events.title}</Text>
                        <Text style={styles.date}>{events.date.when}</Text>
                    </View>
                    <Text style={styles.description}>{events.description}</Text>
                    <View style={styles.button}>
                        <SwipeButton></SwipeButton>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    con: {
        marginTop: 200,
        marginLeft: 10,
        marginRight: 10,
    },
    a: { marginBottom: 40 },
    conton: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
    },

    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    text2: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    circle: {
        backgroundColor: "cyan",
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 10
    },
    headerEvent: {
        backgroundColor: "rgba(198, 198, 198, 0.5)",
        height: 60,
        width: 180,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row"
    },
    container: {
        flex: 1,

        alignItems: "center",
        height: 900,
    },
    image: {
        width: 400,
        height: 900,
        borderRadius: 10,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 16,
        color: "black",
    },
    date: {
        fontSize: 16,
        color: "#212121",
        marginTop: 8,
    },
    button: {
        marginTop: 100,
    },
    description: {
        fontSize: 18,
        marginTop: 16,
        color: "#363636",
    },
    back: {
        height: 40,
        width: 40,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
        borderRadius: 10,
    },
});

export default DateScreen;
