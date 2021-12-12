import { StyleSheet } from 'react-native';
import {COLORS} from '../../../../constants/Colors'
import { width } from '../../../../constants/ScreenDimentionConst'


export const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: -50,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
    categoryTextSelected: {
        color: 'green',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: 'green',
    },
    card: {
        height: 225,
        backgroundColor: COLORS.light,
        width:width/ 2 - 30,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


