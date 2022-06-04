import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors'
import { height } from '../../constants/ScreenDimentionConst';
import { SIZES } from '../../constants/Sizes'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2
    },
    Icon: {
        fontSize: height*0.03,
        color: COLORS.black,
        opacity: 2
    },
    button: {
        padding: 10,
        marginTop: -10
    }

});


