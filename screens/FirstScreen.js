import React, { Component } from 'react';
import {
    StyleSheet,   // CSS-like styles
    Text,         // Renders text
    View          // Container component
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from '../components/Swiper';
import { Entypo } from '@expo/vector-icons';
export default class Screens extends Component {
    render() {
        return (
            <Swiper>
                {/* First screen */}
                <View style={[styles.slide, { backgroundColor: 'orange' }]}>
                    <Icon name="ios-musical-notes" {...iconStyles} />
                    <Text style={styles.header}>Event</Text>
                    <Text style={styles.text}>Our Events App brings together all the events and concerts in the city.</Text>
                </View>
                {/* Second screen */}
                <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
                    <Icon name="ios-search" {...iconStyles} />
                    <Text style={styles.header}>Search</Text>
                    <Text style={styles.text}>You can easily find events, dates and ticket prices.</Text>
                </View>
                {/* Third screen */}
                <View style={[styles.slide, { backgroundColor: 'cyan' }]}>
                    <Entypo name="ticket" size={64} color="white" />
                    <Text style={styles.header}>Ticket</Text>
                    <Text style={styles.text}>When you find an event you like, you can purchase tickets instantly through the application.</Text>
                </View>
            </Swiper>
        );
    }
}

const iconStyles = {
    size: 100,
    color: '#FFFFFF',
};

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
    },
});

