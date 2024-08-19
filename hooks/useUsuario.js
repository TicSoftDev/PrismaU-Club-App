import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { changePassword, deleteAccount } from '../services/UsuariosService';
import { alertSucces, alertWarning } from '../utilities/toast/Toast';

function useUsuario() {

    const { token, credenciales } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [delet, setDelet] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const toggleModalDelete = () => {
        setModalDeleteVisible(!modalDeleteVisible);
        setDelet(false);
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

    const eliminarCuenta = async () => {
        try {
            setLoading(true);
            const data = await deleteAccount(credenciales.id, token);
            setLoading(false);
            if (data.message == "hecho") {
                setDelet(true);
            }
        } catch (error) {
            setLoading(false);
            alertWarning("Error al eliminar la cuenta", error.message);
        }
    }

    return {
        modalVisible, password, loading, modalDeleteVisible, delet, toggleModalDelete, toggleModal, handleChange, handleSubmit, eliminarCuenta
    }
}

export default useUsuario