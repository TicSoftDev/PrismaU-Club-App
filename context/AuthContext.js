import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { validarSesion } from "../services/AuthService";
import { getAsociadoWithFamiliar } from "../services/AsociadosServices";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [credenciales, setCredenciales] = useState({});
    const [token, setToken] = useState(null);

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
    }

    useEffect(() => {
        const loadStoredData = async () => {
            const storedToken = await AsyncStorage.getItem('@token');
            const storedUser = await AsyncStorage.getItem('@user');
            const storedCredenciales = await AsyncStorage.getItem('@credenciales');
            if (storedToken && storedUser && storedCredenciales) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setCredenciales(JSON.parse(storedCredenciales));
            }
        };

        loadStoredData();
    }, []);

    const value = { login, logout, user, token, credenciales };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 