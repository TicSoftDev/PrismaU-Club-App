import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigation } from './StackNavigation';

export default function Navigation() {

    Ionicons.loadFont();

    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}