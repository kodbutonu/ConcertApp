import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import TextHeader from '../components/TextHeader';
import { useNavigation } from "@react-navigation/native";
import TextDescription from '../components/TextDescription';
import ButtonDesign from '../components/ButtonDesign';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../FirebaseConfig';
import firebase from 'firebase/compat/app';


const OtpScreen = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);

    const [verificationId, setVerificationId] = useState(null);
     const [isVerified, setIsVerified] = useState(false); 
    const recaptchaVerifier = useRef(null);
    const codeInputs = useRef([]);
    const handleCodeChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (index < code.length - 1 && value !== '') {
            codeInputs.current[index + 1].focus(); // Bir sonraki girdi alanına geç
        }
    };
    useEffect(() => {
        if (isVerified) {
            navigation.navigate('Register');
        }
    }, [isVerified]);
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider(); // Firebase.auth() kullanarak tanımlayın
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId)
            .catch((error) => {
                console.error("Bir hata oluştu:", error);
                
            });
        setPhoneNumber('');
    };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code.join('') // Girilen kodları birleştirerek credential'a geçirin
        );
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode(['', '', '', '', '', '']); // Kodları sıfırla
                setIsVerified(true);
                Alert.alert('Giriş başarılı');
            })
            .catch((error) => {
                Alert.alert('Giriş başarısız tekrar deneyin.');
            });
       
       
       
    }


    // Diğer fonksiyonları da aynı şekilde güncelleyin

    return (

        <View style={styles.view}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <TextHeader text='Cep Telefonum' />
            <TextDescription text='Lütfen geçerli 10 haneli telefon numaranızı girin. Hesabınızı doğrulamak için 4 haneli bir kod göndereceğiz.' color='grey' />
            <TextInput
                placeholder="5551234567"
                keyboardType='phone-pad'
                onChangeText={setPhoneNumber}
                secureTextEntry={false}
                style={styles.input}
            />
            <TouchableOpacity onPress={sendVerification} style={styles.buttonContainer}>
                <ButtonDesign color="orange" text="Devam Et" style={styles.buttonContainer} />
            </TouchableOpacity>
            <View style={styles.container}>
                <TextHeader text='Doğrulama Kodu' />
                <View style={styles.otpContainer}>
                    {code.map((value, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (codeInputs.current[index] = ref)}
                            maxLength={1}
                            keyboardType='numeric'
                            onChangeText={(value) => handleCodeChange(index, value)}
                            style={[styles.otpInput, { backgroundColor: value === '' ? 'white' : 'orange' }]}
                            value={value}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.buttonContaine} onPress={confirmCode}>
                    <ButtonDesign color="orange" text="Doğrula" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    view: {
        marginTop: 100,
        marginRight: 50,
        marginLeft: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#ddd'
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
    },
    xd:{
        marginBottom:20
    },


    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 5,
    },

    otpContainer: {
        marginTop: 20,
        flexDirection: 'row', // Elemanları yatayda sırala
        justifyContent: 'center', // Elemanları yatayda ortala
        alignItems: 'center', // Elemanları dikeyde ortala
    },
    otpInput: {
        width: 40, // Giriş alanının genişliği
        height: 40, // Giriş alanının yüksekliği
        fontSize: 18, // Giriş alanı yazı boyutu
        borderWidth: 1, // Kenarlık kalınlığı
        borderColor: '#CCCCCC', // Kenarlık rengi gri tonu
        marginHorizontal: 5, // Yatayda boşluk bırak
        textAlign: 'center', // Yazıyı ortala
    },
    buttonContaine: {
        marginTop: 40, // Üste boşluk bırak
    },
    buttonContainer: {
        marginTop: 20, // Üste boşluk bırak
    },


});


export default OtpScreen;
