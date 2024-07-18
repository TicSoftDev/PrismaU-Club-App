import React from 'react';
import FormProfile from '../../components/profile/FormProfile';
import ModalPassword from '../../components/profile/ModalPassword';
import useUsuario from '../../hooks/useUsuario';

export default function ProfileScreen() {

  const { modalVisible, password, loading, toggleModal, handleChange, handleSubmit } = useUsuario();

  return (
    <>
      <FormProfile toggleModal={toggleModal} />
      <ModalPassword modalVisible={modalVisible} toggleModal={toggleModal} loading={loading}
        password={password} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  )
} 