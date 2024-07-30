import React from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const FormReset = ({ texto, value, loading, handleChange, placeholder, handleSubmit }) => {
    return (
        <View style={tw`px-4 pt-4 pb-20 w-full`}>
            <Text style={tw`text-xl m-2`}>{texto}</Text>
            <TextInput
                style={tw`w-full h-10 border-2 border-gray-200 bg-gray-100 mt-5 rounded-lg px-3 mb-10`}
                placeholder={placeholder}
                onChangeText={(text) => handleChange(text)}
                value={value}
            />
            <TouchableOpacity style={tw`flex justify-center items-center bg-green-500 text-white text-center rounded-lg h-8`}
                onPress={handleSubmit}>
                <Text style={tw`text-white text-center font-bold`}>
                    {loading ? <ActivityIndicator color={'#fff'} size={'small'} /> : 'Siguiente'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default FormReset