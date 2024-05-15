import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function useApp() {

    const [isSplashReady, setSplashReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashReady(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return {
        isSplashReady
    }
}