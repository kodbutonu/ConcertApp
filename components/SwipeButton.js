import React, { useState } from 'react';
import { View, PanResponder, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from "expo-blur";
import { AntDesign } from '@expo/vector-icons';
const SwipeButton = () => {
    const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
    const [blurIntensity, setBlurIntensity] = useState(0);

    const rocketIconPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const newX = iconPosition.x + gestureState.dx;

            // Calculate the blur intensity based on icon position
            const newBlurIntensity = (newX / 300) * 100; // Assuming 300 is the final point

            // Update the blur intensity
            setBlurIntensity(newBlurIntensity);

            // Update the icon position
            setIconPosition({ x: newX, y: 0 });
        },
        onPanResponderRelease: () => {
            // Handle release action if needed
        },
    });

    return (
        <View style={styles.container}>
            <BlurView intensity={blurIntensity} style={styles.blurContainer}>
                <View
                    style={{
                        position: 'absolute',
                        left: iconPosition.x,
                        top: iconPosition.y,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: 'orange',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    {...rocketIconPanResponder.panHandlers}
                >
                    <AntDesign name="right" size={24} color="white" />
                </View>
                <Text style={{ marginLeft: 30, marginTop: 20, color: "white", fontWeight: "bold" }}>Swipe to buy a ticket</Text>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        overflow: "hidden",
        width: 330,
        height: 60,
    },
    blurContainer: {
        alignItems: "center",
        height: 60,
    },
});

export default SwipeButton;
