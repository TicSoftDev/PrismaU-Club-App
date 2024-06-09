import React, { useState } from 'react'
import { changePassword } from '../services/UsuariosService';
import { useAuthContext } from '../context/AuthContext';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

function useUsuario() {

    const { token, credenciales } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleChange = (value) => {
        setPassword(value);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await changePassword(credenciales.id, password, token);
            setLoading(false);
            if (data.message == "hecho") {
                toggleModal();
                setPassword('');
                alertSucces("Contraseña actualizada");
            }
        } catch (error) {
            setLoading(false);
            alertWarning(error.message);
        }
    }

    return {
        modalVisible, password, loading, toggleModal, handleChange, handleSubmit
    }
}

export default useUsuario