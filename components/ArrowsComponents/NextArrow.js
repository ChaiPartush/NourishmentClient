import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { styles } from '../../Styles/ArrowsComponents/BackArrowStyle'
import { height, width } from '../../constants/ScreenDimentionConst'


export const NextArrow = ({ navigateToPageFunc, contentStyle }) => {
    return (

        <TouchableOpacity onPress={navigateToPageFunc} style={contentStyle} >
            <View>
                <AntDesignIcons name="right" style={styles.Icon} />
            </View>
        </TouchableOpacity >

    )
}














