import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const ContainerFormulario = ({ titulo, children }) => {
    return (
        <ScrollView style={tw`flex-1 bg-gray-100`}>
            <View style={tw`absolute h-1/2 w-full bg-green-500`} />
            <View style={tw`h-20 w-full bg-green-500 pt-12 px-4`}>
                <Text style={tw`text-2xl font-bold text-white`}>{titulo}</Text>
            </View>
            <View style={tw`px-4 pt-8 pb-20 w-full`}>
                <View style={tw`bg-white rounded-lg p-4 shadow-lg`}>
                    {children}
                </View>
            </View>
        </ScrollView>
    )
}

export default ContainerFormulario