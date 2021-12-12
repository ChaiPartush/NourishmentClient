import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { styles } from '../../Styles/ArrowsComponents/NextArrowStyle'

export const NextArrow = ({ navigateToPageFunc }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToPageFunc}>
                <View style={styles.button}>
                    <AntDesignIcons name="right" style={styles.icon} />
                </View>
            </TouchableOpacity>
        </View>
    )
}














