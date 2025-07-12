import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function Paginacion({ totalPages, currentPage, totalItems, hasNextPage, hasPrevPage, nextPage, prevPage }) {
    return (
        <>
            {totalPages > 1 && (
                <View style={tw`bg-white mx-4 rounded-lg shadow-sm`}>
                    <View style={tw`p-2 flex-row justify-between items-center`}>
                        <TouchableOpacity
                            style={tw`px-4 py-2 rounded-lg ${hasPrevPage ? 'bg-green-500' : 'bg-gray-300'}`}
                            onPress={prevPage}
                            disabled={!hasPrevPage}
                        >
                            <Ionicons name="chevron-back" size={14} color="white" />
                        </TouchableOpacity>

                        <View style={tw`flex-row items-center`}>
                            <Text style={tw`text-sm text-gray-600 mr-2`}>
                                Página {currentPage} de {totalPages}
                            </Text>
                            <Text style={tw`text-sm text-gray-500`}>
                                (total: {totalItems})
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={tw`px-4 py-2 rounded-lg ${hasNextPage ? 'bg-green-500' : 'bg-gray-300'}`}
                            onPress={nextPage}
                            disabled={!hasNextPage}
                        >
                            <Ionicons name="chevron-forward" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}