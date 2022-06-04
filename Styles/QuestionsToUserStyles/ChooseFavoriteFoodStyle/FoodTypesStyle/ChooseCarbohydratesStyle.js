import { StyleSheet } from 'react-native';
import { SIZES } from '../../../../constants/Sizes'
import { COLORS } from '../../../../constants/Colors'
import { FONTS } from '../../../../constants/Fonts'

export const styles = StyleSheet.create({
    cardContainer: {
        width: 150,
        padding: SIZES.radius,
        marginBottom: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2
    },
    cardIcon: {
        width: 20,
        height: 20,
        
    },
    cardIconContainer: {
        alignItems:'flex-end'
      
    },

    cardContainerImage: {
        height: 150,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardImage: {
        height: '100%',
        width: '100%'
    },

    cardTextContainer: {
        alignItems: 'center',
        marginTop: -20
    },

    cardName: {
        ...FONTS.h3
    },
    cardDescription: {
        color: COLORS.darkGray2,
        textAlign: 'center',
        ...FONTS.body5
    },
    categoriesButton: {
        flexDirection: 'row',
        height: 55,
        marginTop: 50,
    },
    categoriesImage: {
        marginTop: 5,
        height: 50,
        width: 50
    },
    categoriesName: {
        alignSelf: 'center',
        marginRight: SIZES.base,
        ...FONTS.h3
    }
});


