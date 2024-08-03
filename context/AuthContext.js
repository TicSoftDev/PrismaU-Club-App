import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { validarSesion } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [credenciales, setCredenciales] = useState({});
    const [token, setToken] = useState(null);

    const checkUserSession = async () => {
        try {
            const userData = await AsyncStorage.getItem('@user');
            const token = await AsyncStorage.getItem('@token');
            const credenciales = await AsyncStorage.getItem('@credenciales');
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    await logout();
                    return;
                }
            }
            if (userData && token && credenciales) {
                setUser(JSON.parse(userData));
                setToken(token);
                setCredenciales(JSON.parse(credenciales));
            }
        } catch (e) {
            console.error(e);
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
                setToken(data.token);
                await AsyncStorage.setItem('@token', data.token);
                await AsyncStorage.setItem('@credenciales', JSON.stringify(data.credenciales));
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
        await AsyncStorage.multiRemove(['@token', '@credenciales', '@user']);
    };

    const value = { login, logout, user, token, credenciales, isLoading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 