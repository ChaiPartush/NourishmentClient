import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { SIZES } from '../../constants/Sizes'
import { FONTS } from '../../constants/Fonts'
import { IconButton } from './IconButton'
import { ICONS } from '../../constants/Icons'
import {width,height} from '../../constants/ScreenDimentionConst'



export const StepperInput = ({
    containerStyle,
    value = 1,
    onAdd,
    onMinus
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: height*0.06,
                width: 130,
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >
            <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}

                icon={ICONS.minus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: value > 1 ? COLORS.primary : COLORS.gray
                }}
                onPress={onMinus}
            />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    ...FONTS.h2
                }}>{value}</Text>

            </View>

            <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}

                icon={ICONS.plus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: value < 12 ? COLORS.primary : COLORS.gray
                }}
                onPress={onAdd}
            />

        </View>
    )

}