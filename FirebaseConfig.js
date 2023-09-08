
import firebase from "@firebase/app-compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBuWM7zQEtT8fFSL-I5BB3_ea_X34WLPoo",
    authDomain: "food-5b17c.firebaseapp.com",
    projectId: "food-5b17c",
    storageBucket: "food-5b17c.appspot.com",
    messagingSenderId: "927666243449",
    appId: "1:927666243449:web:521b80c860df7d655a91a8",
    measurementId: "G-V0YC49CX82"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export {firebase};
