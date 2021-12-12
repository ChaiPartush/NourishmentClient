import { StyleSheet } from 'react-native';
import { width } from '../../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D5EEFF',
        width: (width * 48) / 100,
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 10,
        elevation: 12
    },

    sliderButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#FEF1E6',
        backgroundColor: '#DF711B',
    },

    columnstyle: { flexDirection: 'column', flex: 1, alignItems: 'center' },

    titleText: { fontSize: 18, color: '#8D8E98', fontWeight: 'bold' },

    slider: {
        marginRight: 100
    },

    sliderAndTextNumber: { marginTop: 50 },

    heightNumberAndCentimeterContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: -50,
        marginLeft: 110
    },

    heightNumberText: { fontSize: 50, fontWeight: 'bold', color: '#8F4068' },
    cetimeterText: { fontSize: 18, color: '#8D8E98', marginTop: 10 }
});


