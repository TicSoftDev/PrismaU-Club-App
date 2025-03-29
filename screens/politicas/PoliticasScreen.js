import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function PoliticasScreen() {

    return (
        <ScrollView style={tw`flex-1`}>
            <View style={tw`h-20 w-full bg-green-500 pt-8 px-4`}>
                <Text style={tw`text-xl font-bold text-white`}>Politicas y Privacidad</Text>
            </View>
            <View style={tw`p-2 mb-2`}>

            </View>
        </ScrollView>
    )
}
