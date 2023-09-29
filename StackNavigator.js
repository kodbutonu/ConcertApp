import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OtpScreen from "./screens/OtpScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EmailScreen from "./screens/EmailScreen";
import { AuthProvider } from './context/AuthProvider';
import EventDetailScreen from "./screens/EventDetailScreen";
import DateScreen from "./screens/DateScreen";
import { FavoriteProvider } from "./context/FavoriteContext";
import FavoriteEventsScreen from "./screens/FavoriteScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileDetailScreen from "./screens/ProfileDetailScreen";
import Screens from "./screens/FirstScreen";
import LottieViews from "./screens/AnimationScreen";
import SplashScreen from "./screens/SplashScreen";
import UserAgreementScreen from "./screens/UserAgreementScreen";
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <FavoriteProvider>
        <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="First" component={Screens} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="User" component={UserAgreementScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home"  component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EventsDetail" component={EventDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Date" component={DateScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Favorite" component={FavoriteEventsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
            </AuthProvider>
        </FavoriteProvider>
       
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
