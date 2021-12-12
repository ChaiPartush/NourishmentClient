import { StyleSheet } from 'react-native';
import { width, height } from '../../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        width: width / 3,
        elevation: 12,
        height: height / 5,
        marginRight: (1 * width) / 100,
        marginLeft: (1 * width) / 100,
        marginTop: (1 * height) / 100,
        marginBottom: (1 * height) / 100,
        borderRadius: 10,
        flex: 1,
        elevation: 12,
        backgroundColor: '#F2DAC3',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnStyle: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        color: '#8D8E98',
        fontWeight: 'bold'
    },
    weightNumber: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#8F4068'
    },
    kilogramtext: {
        fontSize: 18,
        color: '#8D8E98'
    },
    multislider: {
        flexDirection: 'row',
        alignItems: 'center'
    }


});


