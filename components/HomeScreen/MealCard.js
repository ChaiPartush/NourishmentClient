import React, { useState } from 'react'
import { View, Text, Animated } from 'react-native'
import { height, width } from '../../constants/ScreenDimentionConst';
import { styles } from '../../Styles/QuestionsToUserStyles/ChooseProblemStyle'
import { COLORS } from '../../constants/Colors'
import { MealDescriptionSteps } from '../../components/HomeScreen/MealDescriptionSteps'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MARGIN = 16;
export const CARD_HEIGHT = 550 + MARGIN * 2;


export const MealCard = ({ index, y }) => {
    const position = Animated.subtract(index * CARD_HEIGHT, y)
    const isDisappearing = -CARD_HEIGHT;
    const isTop = 0;
    const isBottom = height - CARD_HEIGHT
    const isAppearing = height
    const translateY = Animated.add(
        Animated.add(
            y,
            y.interpolate({
                inputRange: [0, 0.00001 + index * CARD_HEIGHT],
                outputRange: [0, -index * CARD_HEIGHT],
                extrapolateRight: "clamp",
            })
        ),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -CARD_HEIGHT / 4],
            extrapolate: "clamp",
        })
    );

    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });

    const [precent, setPrecent] = useState(0.0);
    const createPrecentMultiSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(precent)}
                min={0.0}
                max={100.0}
                step={0.1}
                selectedStyle={{ backgroundColor: '#986D8E' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={(width * 55) / 100}
                customMarker={(e) => {
                    return (
                        <View>
                            <View
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 15,
                                    borderWidth: 2,
                                    borderColor: '#FEF1E6',
                                    backgroundColor: '#DF711B',
                                }}
                            ></View>
                        </View>
                    )
                }}
                onValuesChange={(value) => {

                    setPrecent(value)
                }}
            />
        )
    }

    return (
        <Animated.View style={{
            height: 550,
            width: width / 2,
            elevation: 15,
            marginRight: 20,
            borderColor: '#944E6C',
            borderRadius: 15,

            backgroundColor: '#A68DAD', marginTop: 20, alignItems: 'center', marginLeft: 17, width: width * 0.9, opacity, transform: [{ translateY }, { scale }]
        }}>
            <View style={{
                height: 0,
                backgroundColor: COLORS.white,
                position: 'absolute',
                zIndex: 100,
                width: width / 2,
                borderRadius: 15,
                flexDirection: 'column',
                flex: 1
            }} />
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E4E7F4', marginLeft: -320 }}>
                {index < 9 ? '0' + (index + 1) : (index + 1)}
            </Text>

            <MealDescriptionSteps />
            

            <View style={{
                borderRadius: 10,
                // height: height * 0.09,
                backgroundColor: '#D6B0B1',
                // position: 'absolute',
                // bottom: 0,
                // padding: 10,
                width: '100%',
                 elevation: 50,
            }}>

                <View style={{
                    // flexDirection: 'column',
                    // flex: 1,
                    alignItems: 'center',

                }}>
                    <Text style={{
                        fontSize: 18,
                        
                        color: '#8D8E98',
                        fontWeight: 'bold'
                    }}>Amount Food from all day</Text>
                    <View style={{ flexDirection: 'row', marginLeft:20 }}>
                        <View style={{ right: -5, top: -3 }}>{createPrecentMultiSlider()}</View>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'baseline', left: 40 }}>
                            <Text style={{
                                fontSize: 25,
                                
                                fontWeight: 'bold',
                                color: '#8F4068'
                            }}>{parseFloat(precent).toFixed(1).toString()}</Text>
                            <Text style={{
                                fontSize: 18,
                                color: '#8D8E98'
                            }}>%</Text>
                        </View>
                    </View>


                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>
                </View>
            </View>

        </Animated.View>
    );
};