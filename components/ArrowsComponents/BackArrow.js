import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants/Colors'
import { height, width } from '../../constants/ScreenDimentionConst';
import { styles } from '../../Styles/ArrowsComponents/BackArrowStyle'

export const BackArrow = ({ handleBack }) => {
    return (
        <TouchableOpacity
            onPress={handleBack}
        >
            <AntDesignIcons name="left" style={{
                fontSize: height * 0.03,
                color: COLORS.black,
             
                
            }} />
        </TouchableOpacity>
    )
    // <SafeAreaView>
    {/* <View style={styles.container}> */ }
    // <TouchableOpacity
    //     onPress={handleBack}
    // >
    //     <AntDesignIcons name="left" style={styles.Icon} />
    // </TouchableOpacity>
    // {/* </View> */ }
    // </SafeAreaView>

}