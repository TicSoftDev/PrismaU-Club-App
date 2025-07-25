import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import DataCuotasBaile from '../../components/cuotasBaile/DataCuotasBaile';
import ModalCuotasBaile from '../../components/cuotasBaile/ModalCuotasBaile';
import FiltrosBusqueda from '../../components/mensualidades/FiltrosBusqueda';
import Paginacion from '../../components/mensualidades/Paginacion';
import PagoMensualidades from '../../components/mensualidades/PagoMensualidades';
import Resumen from '../../components/mensualidades/Resumen';
import useCuotasBaile from '../../hooks/useCuotasBaile';

export default function CuotasBaileScreen() {
    const { loading, refreshing, cuotas, searchQuery, selectedFilter, sortBy, sortOrder, currentPage, isLoadingPayment,
        pago, touched, totalPages, totalItems, hasNextPage, hasPrevPage, stats, showFilters, showPaymentModal, cuota,
        initPoint, handleChange, handleChangeCheck, setShowFilters, handleSearch, handleFilterChange, cargarCuota,
        handleSortChange, cerrarModal, goToPage, nextPage, prevPage, updateCuota, refresh, crearPreferencia } = useCuotasBaile();

    if (initPoint) {
        return (
            <PagoMensualidades initPoint={initPoint} cerrarModal={cerrarModal} />
        );
    }

    return (
        <View style={tw`flex-1 bg-gray-50`}>
            <View style={tw`w-full bg-green-500 px-4 py-5 justify-center`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-xl font-bold text-white`}>Cuotas de Baile</Text>
                </View>
            </View>

            <Resumen stats={stats} />

            <FiltrosBusqueda
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                stats={stats}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleFilterChange={handleFilterChange}
                selectedFilter={selectedFilter}
            />

            <DataCuotasBaile
                cuotas={cuotas}
                loading={loading}
                refreshing={refreshing}
                refresh={refresh}
                handlePago={cargarCuota}
            />

            <Paginacion
                totalPages={totalPages}
                currentPage={currentPage}
                totalItems={totalItems}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                nextPage={nextPage}
                prevPage={prevPage}
                goToPage={goToPage}
            />

            <ModalCuotasBaile
                showPaymentModal={showPaymentModal}
                cerrarModal={cerrarModal}
                cuota={cuota}
                crearPreferencia={crearPreferencia}
                loading={isLoadingPayment}
                initPoint={initPoint}
                touched={touched}
                handleChange={handleChange}
                pago={pago}
                handleChangeCheck={handleChangeCheck}
            />
        </View>
    );
}
