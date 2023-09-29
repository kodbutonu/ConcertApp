// src/screens/UserAgreementScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// Örnek bir sözleşme metni
const agreementText = `
Bu kullanıcı sözleşmesi, bu uygulamayı kullanırken kabul edilen bir anlaşmadır.
Lütfen bu sözleşmeyi dikkatlice okuyun.

1. Gizlilik Politikası: Kullanıcı olarak, uygulamamızın gizlilik politikasını kabul ediyorsunuz. Kişisel bilgilerinizin toplanması, kullanılması ve paylaşılması ile ilgili politikamızı okumadan kullanmamanızı tavsiye ederiz.

2. Hesap Güvenliği: Kullanıcı adı ve şifre gibi kimlik bilgilerini güvende tutmak sizin sorumluluğunuzdadır. Hesap güvenliğiniz için gerekli önlemleri almanız önemlidir.

3. Hizmet Kullanımı: Uygulamamızı yasadışı veya zararlı bir şekilde kullanmak yasaktır. Kullanıcılar, uygulama kurallarına ve yerel yasalara uymak zorundadır.
`;

const UserAgreementScreen = () => {
    const [readAgreement, setReadAgreement] = useState(false);
    const [acceptedAgreement, setAcceptedAgreement] = useState(false);
    const navigation = useNavigation();
    const handleAccept = () => {
        if (readAgreement && acceptedAgreement) {
            // Kullanıcı kabul etti, istediğiniz işlemleri yapabilirsiniz.
            // Örneğin, ana uygulama ekranına yönlendirebilirsiniz.
            navigation.navigate('Email');
        } else {
            let errorMessage = '';
            if (!readAgreement) {
                errorMessage += 'Sözleşmeyi okudum seçeneğini işaretleyiniz.\n';
            }
            if (!acceptedAgreement) {
                errorMessage += 'Kabul ediyorum seçeneğini işaretleyiniz.';
            }
            alert(errorMessage);
        }
    };

    const toggleReadAgreement = () => {
        setReadAgreement(!readAgreement);
    };

    const toggleAcceptedAgreement = () => {
        setAcceptedAgreement(!acceptedAgreement);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>
                        {agreementText}
                    </Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: readAgreement ? "green": 'white',
                            borderColor:"white",
                            borderWidth: 2,
                            padding: 15,
                            alignItems: 'center',
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        onPress={toggleReadAgreement}
                    >
                        <Text style={{ color: readAgreement ? 'white' :"green", fontSize: 18 }}>Okudum</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: acceptedAgreement ? "green" : 'white',
                            borderColor: "red",
                            borderWidth: 2,
                            padding: 15,
                            alignItems: 'center',
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        onPress={toggleAcceptedAgreement}
                    >
                        <Text style={{ color: acceptedAgreement ? 'white' : "green", fontSize: 18 }}>Kabul Ediyorum</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor:"green",
                            padding: 15,
                            alignItems: 'center',
                            borderRadius: 10,
                        }}
                        onPress={handleAccept}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Kabul Et</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default UserAgreementScreen;
