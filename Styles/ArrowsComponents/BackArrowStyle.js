import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors'
import { SIZES } from '../../constants/Sizes'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2
    },
    Icon: {
        fontSize: 25,
        color: COLORS.black,
        opacity: 1
    },
    button: {
        padding: 10,
        marginTop: -10
    }

});


