import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import LoginScreen from "./screens/LoginScreen";
import OtpScreen from "./screens/OtpScreen";
import MailScreen from "./screens/MailScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EmailScreen from "./screens/EmailScreen";
import { AuthProvider } from './context/AuthProvider';
import EventDetailScreen from "./screens/EventDetailScreen";
import DateScreen from "./screens/DateScreen";
import { FavoriteProvider } from "./context/FavoriteContext";
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <FavoriteProvider>
        <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Mail" component={MailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EventsDetail" component={EventDetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Date" component={DateScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
            </AuthProvider>
        </FavoriteProvider>
       
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
