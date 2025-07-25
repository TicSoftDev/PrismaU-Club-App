import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DataMensualidades from '../../components/mensualidades/DataMensualidades';
import FiltrosBusqueda from '../../components/mensualidades/FiltrosBusqueda';
import ModalMensualidades from '../../components/mensualidades/ModalMensualidades';
import Paginacion from '../../components/mensualidades/Paginacion';
import PagoMensualidades from '../../components/mensualidades/PagoMensualidades';
import Resumen from '../../components/mensualidades/Resumen';
import useMensualidades from '../../hooks/useMensualidades';

export default function MensualidadScreen() {
    const { loading, refreshing, mensualidades, searchQuery, selectedFilter, sortBy, sortOrder, currentPage,
        isLoadingPayment, pago, touched, totalPages, totalItems, hasNextPage, hasPrevPage, stats, showFilters,
        showPaymentModal, mensualidad, initPoint, handleChange, handleChangeCheck,
        setShowFilters, handleSearch, handleFilterChange, handleSortChange, cargarMensualidad, cerrarModal,
        goToPage, nextPage, prevPage, updateMensualidad, refresh, crearPreferencia } = useMensualidades();

    if (initPoint) {
        return (
            <PagoMensualidades initPoint={initPoint} cerrarModal={cerrarModal} />
        );
    }

    return (
        <View style={tw`flex-1 bg-gray-50`}>
            <View style={tw`w-full bg-green-500 px-4 py-5 justify-center`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-xl font-bold text-white`}>Mensualidades</Text>
                </View>
            </View>

            <Resumen stats={stats} />
            <FiltrosBusqueda searchQuery={searchQuery} handleSearch={handleSearch} showFilters={showFilters}
                setShowFilters={setShowFilters} stats={stats} handleSortChange={handleSortChange} sortBy={sortBy}
                sortOrder={sortOrder} handleFilterChange={handleFilterChange} selectedFilter={selectedFilter} />

            <DataMensualidades mensualidades={mensualidades} loading={loading} refreshing={refreshing}
                refresh={refresh} handlePago={cargarMensualidad} />

            <Paginacion totalPages={totalPages} currentPage={currentPage} totalItems={totalItems} hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage} nextPage={nextPage} prevPage={prevPage} goToPage={goToPage} />

            <ModalMensualidades showPaymentModal={showPaymentModal} cerrarModal={cerrarModal} mensualidad={mensualidad}
                crearPreferencia={crearPreferencia} loading={isLoadingPayment} initPoint={initPoint}
                touched={touched} handleChange={handleChange} pago={pago} handleChangeCheck={handleChangeCheck} />

        </View>
    );
}