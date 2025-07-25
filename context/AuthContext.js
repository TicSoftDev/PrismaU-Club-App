import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base64 } from "js-base64";
import { createContext, useContext, useEffect, useState } from "react";
import { validarSesion } from "../services/AuthService";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [credenciales, setCredenciales] = useState({});
    const [socio, setSocio] = useState(null);
    const [token, setToken] = useState(null);

    const checkUserSession = async () => {
        try {
            const userData = await AsyncStorage.getItem('@user');
            const token = await AsyncStorage.getItem('@token');
            const credenciales = await AsyncStorage.getItem('@credenciales');
            const socioData = await AsyncStorage.getItem('@socio');
            if (token) {
                try {
                    let expiracion = isTokenExpired(token);
                    if (expiracion) {
                        await logout();
                        return;
                    }
                } catch (decodeError) {
                    console.error('Error decodificando el token:', decodeError);
                    await logout();
                    return;
                }
            }
            if (userData && token && credenciales) {
                setUser(JSON.parse(userData));
                setToken(token);
                setCredenciales(JSON.parse(credenciales));
                setSocio(socioData ? JSON.parse(socioData) : null);
            }
        } catch (e) {
            console.error('Error en checkUserSession:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    const login = async (documento, password) => {
        try {
            const data = await validarSesion(documento, password);
            if (data.status === false) {
                return false;
            } else {
                setUser(data.user);
                setCredenciales(data.credenciales);
                setSocio(data.socio);
                setToken(data.token);
                await AsyncStorage.setItem('@token', data.token);
                await AsyncStorage.setItem('@credenciales', JSON.stringify(data.credenciales));
                await AsyncStorage.setItem('@socio', JSON.stringify(data.socio));
                await AsyncStorage.setItem('@user', JSON.stringify(data.user));
                return true;
            }
        } catch (error) {
            console.log(`login error: ${error}`);
        }
    }

    const logout = async () => {
        setUser({});
        setToken(null);
        setCredenciales({});
        setSocio(null);
        await AsyncStorage.multiRemove(['@token', '@credenciales', '@user', '@socio']);
    };

    const isTokenExpired = (token) => {
        const arrayToken = token.split('.');
        const payload = JSON.parse(Base64.decode(arrayToken[1]));
        const currentTime = Date.now() / 1000;
        return currentTime > payload.exp;
    }

    const value = { login, logout, user, token, socio, credenciales, isLoading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 