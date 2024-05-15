import React from 'react';
import { Camera } from 'expo-camera';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function ScannerQr({ handleBarCodeScanned, scanned }) {

    const isFocused = useIsFocused();
    
    return (
        <View style={tw`flex-1`}>
            {isFocused && (
                <Camera
                    style={tw`flex-1`}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                    <View style={[tw`absolute w-5 h-5 border-t-4 border-l-4 border-white`, { top: '20%', left: '20%' }]} />
                    <View style={[tw`absolute w-5 h-5 border-t-4 border-r-4 border-white`, { top: '20%', right: '20%' }]} />
                    <View style={[tw`absolute w-5 h-5 border-b-4 border-l-4 border-white`, { bottom: '20%', left: '20%' }]} />
                    <View style={[tw`absolute w-5 h-5 border-b-4 border-r-4 border-white`, { bottom: '20%', right: '20%' }]} />
                </Camera>
            )}
        </View>
    );
}
