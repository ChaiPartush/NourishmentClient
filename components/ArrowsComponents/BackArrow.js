import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants/Colors'
import { styles } from '../../Styles/ArrowsComponents/BackArrowStyle'

export const BackArrow = ({ handleBack }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={handleBack}
                    style={styles.button}>
                    <AntDesignIcons name="left" style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}