import React from 'react'
import FormSolicitud from '../components/solicitudes/FormSolicitud'
import useSolicitudes from '../hooks/useSolicitudes'
import ContainerFormulario from '../utilities/ContainerForm/ContainerFormulario'

const SolicitudesScreen = () => {

  const { titulo, loading, solicitud, handleChange, handleSubmit } = useSolicitudes();

  return (
    <ContainerFormulario titulo={titulo}>
      <FormSolicitud loading={loading} solicitud={solicitud} handleChange={handleChange} handleSubmit={handleSubmit} />
    </ContainerFormulario>
  )
}

export default SolicitudesScreen