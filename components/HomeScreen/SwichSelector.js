import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { SIZES } from '../../constants/Sizes'
import SwitchSelector from "react-native-switch-selector";

import { height, width } from '../../constants/ScreenDimentionConst';

export const SwichSelector = () => {

    return (
        <View>

            <View>
                <SwitchSelector
                    initial={0}
                    textColor={'#7a44cf'} //'#7a44cf'
                    selectedColor={'white'}
                    buttonColor={'#7a44cf'}
                    borderColor={'#7a44cf'}
                    hasPadding
                    style={{ width: width * 0.5, marginTop:5 }}
                    options={[
                        { label: "Weighing", value: "f", imageIcon: require('../../assets/images/Menu/weighing.png') },
                        { label: "Spoons", value: "m", imageIcon: require('../../assets/images/Menu/spoon.png') }
                    ]}
                    testID="gender-switch-selector"
                    accessibilityLabel="gender-switch-selector"
                />

            </View>

        </View>
    )

}