import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors'
import { width, height } from '../../constants/ScreenDimentionConst'

export const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 23,
        color: COLORS.grey4,
        fontWeight: 'bold',
        lineHeight: 30,
        paddingHorizontal: 23,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    sortBtn: {
        backgroundColor: COLORS.primary2,
        height: 50,
        width: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
    },
    categoryItemBtn: {
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: 5,
    },
    card: {
        height: height * 0.30,
        backgroundColor: COLORS.white,
        elevation: 10,
        width: width / 2.5,
        marginRight: 20,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10,
    },
    cardName: {
        marginTop: 10,
        fontSize: 12,
        color: COLORS.primary2,
        fontWeight: 'bold',
    },
    price: { fontWeight: 'bold', color: COLORS.primary2, fontSize: 12 },
    rating: {
        fontWeight: 'bold',
        color: COLORS.primary,
        fontSize: 12,
    },
    title: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20 },
    iconContainer: {
        height: 25,
        width: 25,
        backgroundColor: COLORS.white,
        position: 'absolute',
        elevation: 2,
        right: 15,
        top: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popularItemCard: {
        height: 90,
        width: width - 100,
        backgroundColor: COLORS.white,
        elevation: 10,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 10,
        flexDirection: 'row',
    },
});


