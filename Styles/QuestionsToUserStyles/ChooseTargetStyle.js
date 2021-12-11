import { StyleSheet } from 'react-native';
import { height } from '../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    slider: {

        height: 0.20 * height,
        backgroundColor: "#FFE4D9",
        borderBottomRightRadius: 75
    },
    titleContainer: {
        height: 80,
        justifyContent: 'center',
        transform: [{ translateY: 60 }]
    },
    title: {
        fontSize: 35,
        lineHeight: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#630000"
    },
    slider1: {

        height: 0.12 * height,
        backgroundColor: "#FFE4D9",
        borderTopRightRadius: 75,

    },
    button1: {

        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,

    },
    button2: {

        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 5,
        right: 5,
    },
});


