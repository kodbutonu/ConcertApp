import { Text, View, useWindowDimensions, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.imageContainer}>
                <LottieView
                    source={item.image}
                    autoplay
                    loop
                    style={styles.animation}
                />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Görseller arasına 20 birimlik boşluk ekleyebilirsiniz
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Görsellere 10 birimlik border radius uygulayabilirsiniz
        overflow: 'hidden', // Border radius işlemi için resmin dışında kalan kısımların kesilmesini sağlar
    },
    animation: {
        width: 300,
        height: 300,
    },
    title: {
        marginTop: 20,
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 10,
        color: '#F27121',
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});

export default OnBoardingItem;
