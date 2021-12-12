import { StyleSheet } from 'react-native';
import { width, height } from '../../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#D5EEFF',
        width: (width * 47) / 100,
        marginLeft: (width * 2) / 100,
        borderRadius: 10,
        elevation: 12
    },
    textTitle: {
        fontSize: 18,
        color: '#8D8E98',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    birthdayText: {
        color: '#8F4068',
        marginLeft: 20,
        marginTop: 12,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    calendarButton: {
        color: '#05375A',
        width: (width * 47) / 100
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        marginLeft: 10
    }


});


