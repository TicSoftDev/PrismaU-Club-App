import Toast from "react-native-toast-message";

export const alertSuccess = (message) => {
    Toast.show({
        type: 'success',
        position: 'top',
        text1: '¡Éxito!',
        text2: message,
        visibilityTime: 7000,
        topOffset: 60,
    });
};

export const alertWarning = (title, message) => {
    Toast.show({
        type: 'info',
        position: 'top',
        text1: title,
        text2: message,
        visibilityTime: 9000,
        topOffset: 60,
    });
};
