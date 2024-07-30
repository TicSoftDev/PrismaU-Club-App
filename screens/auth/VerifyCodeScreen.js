import React from 'react';
import FormReset from '../../components/reset/FormReset';
import useReset from '../../hooks/useReset';
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario';

const VerifyCodeScreen = () => {

  const titulo = 'Recuperación de cuenta';
  const texto = 'Se ha enviado un código de verificación a tu correo';
  const placeholder = 'Código';
  const { loading, codigo, handleChangeCode, verificarCodigo } = useReset();


  return (
    <ContainerFormulario titulo={titulo}>
      <FormReset
        texto={texto}
        placeholder={placeholder}
        handleChange={handleChangeCode}
        handleSubmit={verificarCodigo}
        loading={loading}
        value={codigo}
      />
    </ContainerFormulario>
  )
}

export default VerifyCodeScreen