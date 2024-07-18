import React from 'react';
import FormRegistro from '../components/registro/FormRegistro';
import useContrataciones from '../hooks/useContrataciones';

export default function RegistroScreen() {

  const { solicitud, loading, handleChange, registro } = useContrataciones();

  return (
    <>
      <FormRegistro solicitud={solicitud} loading={loading} handleChange={handleChange} handleSubmit={registro} />
    </>
  )
}