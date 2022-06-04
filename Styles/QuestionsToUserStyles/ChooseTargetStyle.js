import { StyleSheet } from 'react-native';
import { height } from '../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    slider: {

        height: 0.20 * height,
        backgroundColor: "#FFE4D9",
        borderBottomRightRadius: 75,
        justifyContent: 'center'
    },
    titleContainer: {
        // height: 80,
        // justifyContent: 'center',
        // transform: [{ translateY: height*0.0007 }]
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
        alignItems: 'flex-end',
        justifyContent: 'center'

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


