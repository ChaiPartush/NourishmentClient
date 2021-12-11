import React, { useState } from 'react';
import {TouchableOpacity,View,Text,Image} from 'react-native'
import { SIZES } from '../../../../../constants/Sizes'
import { COLORS } from '../../../../../constants/Colors'

import { FONTS } from '../../../../../constants/Fonts'
import {ICONS} from '../../../../../constants/Icons'

export const CardChooseCarbohydratesComponent = ({ containerStyle, item, onPress }) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View
            style={{
                width: 150,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle,
            }}
        >

            {/* Name */}
            <View style={{ flexDirection: 'row' }}>
                {/* calories */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Image
                        source={icons.calories}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    /> */}
                    {/* <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
                        {item.calories} Calories
                    </Text> */}
                </View>

                {/* Favorite */}
                <TouchableOpacity
                    onPress={() => setFavorite(!favorite)}
                >
                    <Image
                        source={ICONS.love}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: favorite ? COLORS.primary : COLORS.gray
                        }}

                    />
                </TouchableOpacity>

            </View>


            {/* Image*/}
            <View
                style={{
                    height: 150,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={item.image}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                />

            </View>

            {/*Info*/}
            <View
                style={{
                    alignItems: 'center',
                    marginTop: -20
                }}
            >
                <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
                <Text style={{ color: COLORS.darkGray2, textAlign: 'center', ...FONTS.body5 }}>{item.description}</Text>
                {/* <Text style={{
                    marginTop: SIZES.radius,
                    ...FONTS.h2
                }}>${item.price}</Text> */}


            </View >



        </View >
    )
}
