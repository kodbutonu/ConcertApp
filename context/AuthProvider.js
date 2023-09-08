import { createContext, useContext, useState } from 'react';

// Context'i oluşturun
const AuthContext = createContext();

// Provider bileşenini tanımlayın
export const AuthProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false); // Başlangıçta hesap doğrulama başarılı değil

    return (
        <AuthContext.Provider value={{ isVerified, setIsVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook'u kullanarak context değerlerine erişim sağlayın
export const useAuth = () => useContext(AuthContext);
