import React from 'react';
import FormProfile from '../../components/profile/FormProfile';
import ModalPassword from '../../components/profile/ModalPassword';
import useUsuario from '../../hooks/useUsuario';
import ModalDeleteAccount from '../../components/profile/ModalDeleteAccount';
import useHome from '../../hooks/useHome';

export default function ProfileScreen() {

  const { modalVisible, password, loading, modalDeleteVisible, delet,
    toggleModalDelete, toggleModal, handleChange, handleSubmit, eliminarCuenta } = useUsuario();
  const { loadingPerfil, menuPerfil } = useHome();

  return (
    <>
      <FormProfile toggleModal={toggleModal} eliminarCuenta={toggleModalDelete} loading={loadingPerfil} menu={menuPerfil} />
      <ModalPassword modalVisible={modalVisible} toggleModal={toggleModal} loading={loading}
        password={password} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ModalDeleteAccount modal={modalDeleteVisible} toggleModal={toggleModalDelete} loading={loading}
        eliminar={eliminarCuenta} res={delet} />
    </>
  )
} 