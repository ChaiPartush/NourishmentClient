import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { bmiCardStyle } from '../../../Styles/QuestionsToUserStyles/BmiCardStyle';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width } from '../../../constants/ScreenDimentionConst'
import { COLORS } from '../../../constants/Colors';
import * as Animatable from 'react-native-animatable'


export const SelectWeight = () => {
    const [weight, setWeight] = useState(20.0);
    createWeightMoltiSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(weight)}
                min={20.0}
                max={150.0}
                step={0.1}
                selectedStyle={{ backgroundColor: '#986D8E' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={(width * 85) / 100}
                customMarker={(e) => {
                    return (
                        <View>
                            <View
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    borderWidth: 4,
                                    borderColor: '#FEF1E6',
                                    backgroundColor: '#DF711B',
                                }}
                            ></View>
                        </View>
                    )
                }}
                onValuesChange={(value) => {

                    setWeight(value)
                }}
            />
        )
    }
    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
            <View style={[bmiCardStyle.card, { backgroundColor: '#F2DAC3', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#8D8E98', fontWeight: 'bold' }}>WEIGHT</Text>
                    <Animatable.View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#8F4068' }}>{parseFloat(weight).toFixed(1).toString()}</Text>
                            <Text style={{ fontSize: 18, color: '#8D8E98' }}>kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {createWeightMoltiSlider()}
                        </View>
                    </Animatable.View>
                </View>
            </View>
        </View>
    )

}