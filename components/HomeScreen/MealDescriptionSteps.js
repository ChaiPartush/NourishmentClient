import React, { useState } from 'react'
import { ScrollView, StatusBar, Text, Image, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { SIZES } from '../../constants/Sizes'
import { FONTS } from '../../constants/Fonts'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Icon from 'react-native-vector-icons/AntDesign';
import StepIndicator from 'react-native-step-indicator';
import { height, width } from '../../constants/ScreenDimentionConst'
const track_order_status = [
    {
        id: 1,
        title: "Order Confirmed",
        sub_title: "120 גרם אורז",
        options: [
            'פסטה',
            'קינואה',
            'שיבולת שועל',

        ],

    },
    {
        id: 2,
        title: "Order Prepared",
        sub_title: "150 גרם חזה עוף",
        options: [
            'פסטה',
            'קינואה',
            'שיבולת שועל',

        ],
    },
    {
        id: 3,
        title: "Delivery in Progress",
        sub_title: "10 גרם אבוקדו",
        options: [
            'פסטה',
            'קינואה',
            'שיבולת שועל',

        ],
    },
    {
        id: 4,
        title: "Delivered",
        sub_title: "20 גרם עגבניות",
        options: [
            'פסטה',
            'קינואה',
            'שיבולת שועל'
        ],
    },
    // {
    //     id: 5,
    //     title: "Rate Us",
    //     sub_title: " לאכול רת הארוחסיימתיה",
    //     options: [
    //         'פסטה',
    //         'קינואה',
    //         'שיבולת שועל'
    //     ],
    // }
]




export const MealDescriptionSteps = () => {
    return (
        <View >
         
        

        </View>
    )

}