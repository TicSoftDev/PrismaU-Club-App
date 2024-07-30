import React from 'react';
import FormReset from '../../components/reset/FormReset';
import useReset from '../../hooks/useReset';
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario';

const RecuperacionScreen = () => {

  const titulo = 'Busca tu Cuenta';
  const texto = 'Ingresa tu número de identificación para recuperar tu cuenta';
  const placeholder = 'Número de identificación';
  const { loading, documento, handleChangeDocumento, enviarCodigo } = useReset();

  return (
    <ContainerFormulario titulo={titulo}>
      <FormReset
        texto={texto}
        placeholder={placeholder}
        handleChange={handleChangeDocumento}
        handleSubmit={enviarCodigo}
        loading={loading}
        value={documento}
      />
    </ContainerFormulario>
  )
}

export default RecuperacionScreen