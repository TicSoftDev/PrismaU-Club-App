import Toast from "react-native-toast-message";

export const alertSucces = (message) => {
    Toast.show({
        type: 'success',
        position: 'bottom',
        text1: '¡Éxito!',
        text2: message,
        text1Style: {
            color: 'green',
            fontSize: 18
        },
        text2Style: {
            color: 'black',
            fontSize: 16
        }
    });
}

export const alertWarning = (title, message) => {
    Toast.show({
        type: 'info',
        position: 'bottom',
        text1: title,
        text2: message,
        visibilityTime: 6000,
        autoHide: true,
        text1Style: {
            color: '#3093f0',
            fontSize: 18
        },
        text2Style: {
            color: 'black',
            fontSize: 16
        }
    });


}

