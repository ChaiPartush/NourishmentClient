import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as Animatable from 'react-native-animatable'
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectHeightStyle'
import { COLORS } from '../../../constants/Colors'

export const SelectHeight = ({ chosenHeight }) => {
    const [height, setHeight] = useState(100);
    const renderSlider = () => {
        return (
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
                customMarker={(e) => { return (<View style={styles.sliderButton}></View>) }}
                onValuesChange={(value) => {
                    setHeight(Math.round(value))
                    chosenHeight(Math.round(value))
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.columnstyle}>

                <Text style={styles.titleText}>HEIGHT</Text>

                <Animatable.View style={styles.sliderAndTextNumber}>

                    <View style={styles.slider}>{renderSlider()}</View>

                    <View style={styles.heightNumberAndCentimeterContainer}>
                        <Text style={styles.heightNumberText}>{height.toString()}</Text>
                        <Text style={styles.cetimeterText}>cm</Text>
                    </View>

                </Animatable.View>

            </View>

        </View>
    )

}