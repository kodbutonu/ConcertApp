import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({ percentage }) => {
    const size = 108;
    const strokeWidth = 2;
    const center = size / 2.2;
    const radius = size / 2.2 - strokeWidth / 2.2;
    const circumference = 2.2 * Math.PI * radius;
    const offset = circumference - (circumference * percentage) / 100;

    const progressAnimation = useRef(new Animated.Value(0)).current;

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    return (
        <View style={styles.display}>
            <Svg width={size} height={size} >
                {/* Gerekirse rotasyonu ayarlayabilirsiniz */}
                <G rotation="-90" origin={center}>
                    {/* Dış çember */}
                    <Circle stroke='white' cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />

                    {/* İlerleme çemberi (siyah doldurulmuş) */}
                    <Circle
                        stroke='#F27121'
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        fill='white'  // İçi siyah olarak doldurulur
                    />
                </G>
                <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <AntDesign name="arrowright" size={34} color="#F27121" />
                </TouchableOpacity>
            </Svg>

        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
    },
    display: {
        marginLeft: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default NextButton;
