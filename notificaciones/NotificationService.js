import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
        Alert.alert('Solo funciona en un dispositivo físico');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Permiso de notificaciones no concedido');
        return;
    }

    // Crear canal en Android
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
        });
    }

    // Obtener el token FCM directamente (no token de Expo)
    const token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log('✅ Token FCM:', token);
    Alert.alert('Token FCM', token); // Opcional: mostrarlo visualmente
    return token;
}

export default function usePushNotifications() {
    useEffect(() => {
        registerForPushNotificationsAsync();

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('🔔 Notificación recibida:', notification);
            Alert.alert('📬 Notificación', notification?.request?.content?.body || 'Sin cuerpo');
        });

        return () => subscription.remove();
    }, []);
}
