import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import imagenes from '../../assets/img/imagenes';

export default function SplashScreen() {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
            <Image source={imagenes.logoPrisma} style={tw`w-40 h-40`} resizeMode='contain' />
            <Text style={tw`text-4xl font-bold text-gray-900 mt-8`}>PrismaU</Text>
        </View>
    );
};