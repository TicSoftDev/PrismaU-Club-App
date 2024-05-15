import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import imagenes from '../assets/img/imagenes';

export default function SplashScreen() {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Image source={imagenes.logoPrisma} style={tw`w-32 h-32`} resizeMode='contain' />
            <Text style={tw`text-4xl font-bold text-gray-900 mt-6`}>PrismaU</Text>
        </View>
    );
};
