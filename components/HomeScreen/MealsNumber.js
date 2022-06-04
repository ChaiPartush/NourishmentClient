import React, { useState } from 'react'
import { Animated, View, StyleSheet, Text } from 'react-native';
import { width, height } from '../../constants/ScreenDimentionConst'


const timers = [...Array(12).keys()].map((i) => (i === 0 ? 1 : i + 1));
const ITEM_SIZE = width * 0.14;
const ITEM_SPACING = (width - ITEM_SIZE) * 0.21;


export const MealsNumber = ({ onPress }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [mealsNumber, setMealsNumber] = useState(4)
    return (
        <View style={{ flex: 1, marginTop: -16, marginLeft: -17 }}>
            <Animated.View
            // style={[
            //     StyleSheet.absoluteFillObject,
            //     {
            //         justifyContent: 'flex-end',
            //         alignItems: 'center',

            //     },
            // ]}
            >
            </Animated.View>
            <View>

                <Animated.FlatList
                    initialScrollIndex={2.99}
                    data={timers}
                    keyExtractor={item => item.toString()}
                    horizontal
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true },
                    )


                    }

                    onMomentumScrollEnd={ev => {
                        const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE)
                        setMealsNumber(timers[index])
                        onPress(timers[index])
                    }}


                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_SIZE}
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
                    renderItem={({ item, index }) => {




                        const inputRange = [
                            (index - 2) * ITEM_SIZE,
                            index * ITEM_SIZE,
                            (index + 1) * ITEM_SIZE,

                        ]



                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.1, 1, 0.3]
                        })

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.1, 1.01, 0.4]
                        })



                        return (item < 10) ?
                            <View style={{ width: ITEM_SIZE, marginTop: 10 }}>

                                <Animated.Text style={[styles.text, {

                                    opacity,
                                    transform: [{
                                        scale
                                    }]

                                }]}>{item}</Animated.Text>

                                <Animated.Text style={{
                                    fontSize: 10,
                                    color: '#7a44cf',
                                    fontWeight: 'bold',
                                    marginLeft: -2,
                                    marginTop: -10,
                                    opacity,
                                    transform: [{
                                        scale
                                    }]
                                }}>Meals</Animated.Text>

                            </View> :

                            <View style={{ width: ITEM_SIZE, marginTop: 10 }}>
                                <Animated.Text style={[styles.text, {
                                    opacity,
                                    transform: [{
                                        scale
                                    }]

                                }]}>{item}</Animated.Text>

                                <Animated.Text style={{
                                    fontSize: 10,
                                    color: '#7a44cf',
                                    fontWeight: 'bold',
                                    marginLeft: 6,
                                    marginTop: -10,
                                    opacity,
                                    transform: [{
                                        scale
                                    }]
                                }}>Meals</Animated.Text>

                            </View>


                    }}
                />





            </View>
        </View>
    );

}

const styles = StyleSheet.create({


    text: {
        fontSize: ITEM_SIZE * 0.6,
        //fontFamily: 'Menlo',

        color: '#7a44cf',
        fontWeight: '700',
    }
});