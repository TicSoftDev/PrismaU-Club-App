import React from 'react';
import FormReset from '../../components/reset/FormReset';
import useReset from '../../hooks/useReset';
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario';

const ChangePasswordScreen = () => {

  const titulo = 'Cambiar contraseña';
  const texto = 'Ingresa una nueva contraseña para recuperar tu cuenta';
  const placeholder = 'Nueva contraseña';
  const { loading, password, handleChangePassword, cambiarPassword } = useReset();

  return (
    <ContainerFormulario titulo={titulo}>
      <FormReset
        texto={texto}
        placeholder={placeholder}
        handleChange={handleChangePassword}
        handleSubmit={cambiarPassword}
        loading={loading}
        value={password} />
    </ContainerFormulario>
  )
}

export default ChangePasswordScreen