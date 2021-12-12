import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width } from '../../../constants/ScreenDimentionConst'
import { COLORS } from '../../../constants/Colors';
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectWeightStyle'

export const SelectWeight = () => {
    const [weight, setWeight] = useState(20.0);
    const createWeightMoltiSlider = () => {
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
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.columnStyle}>
                    <Text style={styles.title}>WEIGHT</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.weightNumber}>{parseFloat(weight).toFixed(1).toString()}</Text>
                        <Text style={styles.kilogramtext}>kg</Text>
                    </View>
                    <View style={styles.multislider}>{createWeightMoltiSlider()}</View>
                </View>
            </View>
        </View>
    )

}