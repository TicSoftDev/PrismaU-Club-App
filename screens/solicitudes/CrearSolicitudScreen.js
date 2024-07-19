import React from 'react';
import FormSolicitud from '../../components/solicitudes/FormSolicitud';
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario';
import useSolicitudes from '../../hooks/useSolicitudes';

const CrearSolicitudScreen = () => {

    const { titulo, loading, solicitud, handleChange, handleSubmit } = useSolicitudes();

    return (
        <ContainerFormulario titulo={titulo}>
            <FormSolicitud loading={loading} solicitud={solicitud} handleChange={handleChange} handleSubmit={handleSubmit} />
        </ContainerFormulario>
    )
}

export default CrearSolicitudScreen