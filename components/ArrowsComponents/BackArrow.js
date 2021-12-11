import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants/Colors'

export const BackArrow = ({ handleBack }) => {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2 }}>
                <TouchableOpacity
                    onPress={handleBack}
                    style={{ padding: 10, marginTop: -10 }}>
                    <AntDesignIcons name="left" style={{ fontSize: 25, color: COLORS.black, opacity: 1 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}