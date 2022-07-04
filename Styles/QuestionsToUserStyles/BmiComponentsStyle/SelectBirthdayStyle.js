import { StyleSheet } from 'react-native';
import { width, height } from '../../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#d6ced8',
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
        marginLeft: 20,
        marginTop: 12,
        alignItems: 'center',
     
      

        fontFamily: "Fredoka-Regular", fontSize: height * 0.06, fontWeight: 'bold', color: '#224854'
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


