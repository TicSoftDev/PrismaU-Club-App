import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function FiltrosBusqueda({ searchQuery, handleSearch, showFilters, setShowFilters, stats, handleSortChange,
    sortBy, sortOrder, handleFilterChange, selectedFilter
}) {

    const FilterButton = ({ filter, text, count }) => (
        <TouchableOpacity
            style={tw`px-4 py-2 rounded-full mr-2 ${selectedFilter === filter ? 'bg-green-500' : 'bg-gray-200'}`}
            onPress={() => handleFilterChange(filter)}
        >
            <Text style={tw`text-sm font-medium ${selectedFilter === filter ? 'text-white' : 'text-gray-700'}`}>
                {text} ({count})
            </Text>
        </TouchableOpacity>
    );

    const SortButton = ({ field, text }) => (
        <TouchableOpacity
            style={tw`px-3 py-2 rounded border mr-2 ${sortBy === field ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}`}
            onPress={() => handleSortChange(field, sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc')}
        >
            <Text style={tw`text-sm ${sortBy === field ? 'text-green-700' : 'text-gray-700'}`}>
                {text} {sortBy === field && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={tw`bg-white mx-4 mt-2 rounded-lg shadow-sm`}>
                <View style={tw`p-3`}>
                    <View style={tw`flex-row justify-between items-center mb-3`}>
                        <Text style={tw`text-sm font-medium text-gray-700`}>Buscar por mes o año:</Text>
                        <TouchableOpacity style={tw``} onPress={() => setShowFilters(!showFilters)}>
                            <Text style={tw`text-gray-600 font-medium`}>Filtros</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={tw`border border-gray-300 rounded-lg text-gray-700`}
                        placeholder="Ej: Enero de 2025" value={searchQuery} onChangeText={handleSearch} />
                </View>
            </View>

            {showFilters && (
                <View style={tw`bg-white mx-4 mt-2 rounded-lg shadow-sm`}>
                    <View style={tw`p-4`}>
                        <Text style={tw`text-sm font-medium text-gray-700 mb-3`}>Filtrar por estado:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
                            <FilterButton filter="all" text="Todas" count={stats.total} />
                            <FilterButton filter="paid" text="Pagadas" count={stats.pagadas} />
                            <FilterButton filter="pending" text="Pendientes" count={stats.pendientes} />
                        </ScrollView>

                        <Text style={tw`text-sm font-medium text-gray-700 mb-3`}>Ordenar por:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <SortButton field="date" text="Fecha" />
                            <SortButton field="amount" text="Monto" />
                            <SortButton field="remaining" text="Restante" />
                        </ScrollView>
                    </View> 
                </View>
            )}
        </>
    )
}