import React, { useEffect } from 'react';
import { Text } from 'react-native';
import DetalleSolicitud from '../../components/solicitudes/DetalleSolicitud';
import useSolicitudes from '../../hooks/useSolicitudes';
import ContainerFormulario from '../../utilities/ContainerForm/ContainerFormulario';

const DetalleSolicitudScreen = ({ route }) => {
    const titulo = 'Detalle Solicitud';
    const { id } = route.params;
    const { solicitud, consultarSolicitud, loading } = useSolicitudes();

    useEffect(() => {
        consultarSolicitud(id);
    }, [id]);

    if (loading) {
        return (
            <ContainerFormulario titulo={titulo}>
                <Text>Cargando...</Text>
            </ContainerFormulario>
        );
    }

    return (
        <ContainerFormulario titulo={titulo}>
            <DetalleSolicitud solicitud={solicitud} />
        </ContainerFormulario>
    );
};

export default DetalleSolicitudScreen;
