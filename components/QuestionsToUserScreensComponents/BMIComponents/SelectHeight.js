import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as Animatable from 'react-native-animatable'
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectHeightStyle'
import { Colors } from '../../../colors'
import { width, height } from '../../../constants/ScreenDimentionConst'

export const SelectHeight = ({ chosenHeight }) => {
    const [userHeight, setHeight] = useState(100);
    const renderSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(userHeight)}
                min={100.0}
                max={220.0}
                vertical={true}
                selectedStyle={{ backgroundColor: '#986D8E' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={160}
                customMarker={(e) => { return (<View style={styles.sliderButton}></View>) }}
                onValuesChange={(value) => {
                    setHeight(Math.round(value))
                    chosenHeight(Math.round(value))
                }}
            />
        )
    }

    return (
        // <View style={{
        //     backgroundColor: '#D5EEFF',

        //     alignItems: 'center',
        //     // marginLeft: 5,
        //     borderRadius: 40,
        //     // elevation: 12
        // }}>
        <View style={{
            backgroundColor: '#d6ced8',
            alignItems: 'center',
            borderRadius: 60,
            flexDirection: 'column',
            height: height * 0.2,
            width: width * 0.45,
            alignItems: 'center',
        }}>

            <Text style={{ fontSize: height*0.021, color: '#8D8E98', fontWeight: 'bold', fontFamily: "Fredoka-Regular", }}>גובה</Text>

            {/* <Animatable.View style={{ marginTop: 50 }}>

                    <View style={{ marginRight: 100 }}>{renderSlider()}</View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        marginTop: -50,
                        marginLeft: 110
                    }}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#8F4068' }}>{height.toString()}</Text>
                        <Text style={{ fontSize: 18, color: '#8D8E98', marginTop: 10 }}>cm</Text>
                    </View>

                </Animatable.View> */}

        </View>

        // </View>
    )

}