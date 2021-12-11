import React, { useState, useRef } from 'react'
import { View, Text, Image, Animated, Platform } from 'react-native'
import { width, height } from '../../../constants/ScreenDimentionConst'
const PLACES_ITEM_SIZE = Platform.OS === 'ios' ? width / 1.35 : width / 1.25
const EMPTY_ITEM_SIZE = (width - PLACES_ITEM_SIZE) / 2
import { COLORS } from '../../../constants/Colors'
import { FONTS } from '../../../constants/Fonts'
import { SIZES } from '../../../constants/Sizes'
import { targets } from '../../../constants/Data/QuestionsToUser/ChooseTarget/targets'


export const ScrollTargets = ({ onpress }) => {
    const placesScrollX = useRef(new Animated.Value(0)).current;
    const [places, setPlaces] = useState([{ id: -1 }, ...targets, { id: -2 }])
    const [searchPlaces, setSearchPlaces] = useState(null)
    const [selected, setSlected] = useState(null)


    const onScroll = (event) => {
        const xPos = event.nativeEvent.contentOffset;
        const current = Math.floor(xPos.x / 300);
        onpress(current)
    }

    const data = selected ? searchPlaces : places
    return (
        <Animated.FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            snapToAlignment="center"
            snapToInterval={Platform.OS === 'ios' ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
            scrollEventThrottle={16}
            decelerationRate={0}
            bounces={false}
            onScroll={

                Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: { x: placesScrollX },
                        },


                    }
                ], { useNativeDriver: false })



            }
            onMomentumScrollEnd={onScroll}
            renderItem={({ item, index }) => {
                const opacity = placesScrollX.interpolate({
                    inputRange: [
                        (index - 2) * PLACES_ITEM_SIZE,
                        (index - 1) * PLACES_ITEM_SIZE,
                        index * PLACES_ITEM_SIZE
                    ],
                    outputRange: [0.5, 0.89, 0.5],
                    extrapolate: 'clamp'
                })

                let activeHeight = 0;
                if (Platform.OS === 'ios') {
                    if (height > 800) {
                        activeHeight = height / 2
                    } else {
                        activeHeight = height / 1.65
                    }
                } else {
                    activeHeight = height / 1.6
                }

                const heightMoving = placesScrollX.interpolate({
                    inputRange: [
                        (index - 2) * PLACES_ITEM_SIZE - 20,
                        (index - 1) * PLACES_ITEM_SIZE - 170,
                        index * PLACES_ITEM_SIZE - 20
                    ],
                    outputRange: [height / 2.24,
                        activeHeight, height / 2.25],
                    extrapolate: 'clamp'
                })

                if (index == 0 || index == places.length - 1) {
                    return (
                        <View
                            style={{

                                width: EMPTY_ITEM_SIZE - 18
                            }}
                        />
                    )
                } else {
                    return (
                        <Animated.View
                            opacity={opacity}
                            style={{
                                width: PLACES_ITEM_SIZE - 3,

                                height: heightMoving,
                                alignItems: 'center',
                                borderRadius: 20,
                                padding: 10,



                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 20,

                                }}
                            />

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                marginHorizontal: SIZES.padding
                            }}>
                                <Text style={{ marginBottom: SIZES.radius, color: COLORS.white, ...FONTS.h1 }}>{item.name}</Text>
                                <Text style={{ marginBottom: SIZES.padding, color: COLORS.white, ...FONTS.body3 }}>{item.description}</Text>
                            </View>

                        </Animated.View>


                    )
                }

            }}



        />

    )

}