import { View, StyleSheet, Animated,useWindowDimensions} from 'react-native';
import React from 'react';

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{
            flexDirection: 'row', height: 62, justifyContent: 'center',
            alignItems: "center",
        }}>
            {/* FlatList ile eşleşen sayıda noktayı gösteren Paginator bileşeni */}
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, { width: dotWidth }]} key={i.toString()} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#F27121',
        marginHorizontal: 5,
    },
});

export default Paginator;
