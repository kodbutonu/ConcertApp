import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["black", "gray", "white"]}
                style={styles.gradient}
                start={{ x: 1, y: 0 }} // Sağdan sola başla
                end={{ x: 0, y: 0 }} // Soldan sağa git
            >
                {/* İçerik */}
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
});

export default GradientBackground;
