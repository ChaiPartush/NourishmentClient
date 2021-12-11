import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width, height } from '../../../constants/ScreenDimentionConst'
import * as Animatable from 'react-native-animatable'
import { COLORS } from '../../../constants/Colors'

export const SelectHeight = () => {
    const scrollColor = '#D5EEFF'
    const [height, setHeight] = useState(100);
    return (
        <View style={{ backgroundColor: scrollColor, width: (width * 48) / 100, alignItems: 'center', marginLeft: 5, borderRadius: 10, elevation: 12 }}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#8D8E98', fontWeight: 'bold' }}>HEIGHT</Text>
                    <Animatable.View style={{ marginTop: 50 }}>
                        <View style={{ marginRight: 100 }}>
                            <MultiSlider
                                value={parseFloat(height)}
                                min={100.0}
                                max={220.0}
                                vertical={true}
                                selectedStyle={{ backgroundColor: '#986D8E' }}
                                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                                touchDimensions={{ borderRadius: 100 }}
                                sliderLength={160}
                                customMarker={(e) => {
                                    return (
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
                                    )
                                }}
                                onValuesChange={(value) => {
                                    setHeight(Math.round(value))
                                }}
                            />
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: -50, marginLeft: 110 }}>
                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#8F4068' }}>{height.toString()}</Text>
                            <Text style={{ fontSize: 18, color: '#8D8E98', marginTop: 10 }}>cm</Text>
                        </View>

                    </Animatable.View>

                </View>



            </View>

        </View>
    )

}