import React from 'react'
import FormRegistro from '../components/registro/FormRegistro'
import useSolicitudes from '../hooks/useSolicitudes'

export default function RegistroScreen() {

  const { solicitud, loading, handleChange, registro } = useSolicitudes();

  return (
    <>
      <FormRegistro solicitud={solicitud} loading={loading} handleChange={handleChange} handleSubmit={registro} />
    </>
  )
}