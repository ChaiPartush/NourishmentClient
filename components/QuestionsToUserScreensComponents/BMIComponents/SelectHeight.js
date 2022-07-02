import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Animated } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as Animatable from 'react-native-animatable'
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectHeightStyle'
import { Colors } from '../../../colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { width, height } from '../../../constants/ScreenDimentionConst'

const minAge = 0;
const segmentsLength = 91;
const segmentWidth = 2;
const segmentSpacing = 20;
const spacerWidth = (width - segmentWidth) / 10;
const snapTo = (segmentWidth + segmentSpacing);
const rulerWidth = height + (segmentsLength - 1) * snapTo;
const indicatorWrapperWidth = 100;
const data = [...Array(segmentsLength).keys()].map((i) => i + minAge);

const Ruler = () => {
    return <View style={{
        height: height + 12,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    }}>
        <View style={{
            //  height: spacerWidth,
            // width: 10
        }} />
        {data.map(i => {
            const tenth = i % 10 === 0;
            return (
                <View
                    key={i}
                    style={{
                        height: segmentWidth,
                        backgroundColor: tenth ? '#4c3e5c' : '#4c3e5c30',
                        width: tenth ? 30 : 15,
                        marginTop: tenth ? 10 : 5
                    }}
                />
            )
        })}
        <View style={{
            width: spacerWidth,
            margin: 10
        }} />
    </View>
}

const Slider = () => {
    return (
        <MultiSlider
            value={parseFloat(userHeight)}
            min={100.0}
            max={220.0}
            vertical={true}
            selectedStyle={{ backgroundColor: '#986D8E' }}
            unselectedStyle={{ backgroundColor: '#B2B1B9' }}
            trackStyle={{ height: 8, borderRadius: 8, backgroundColor: Colors.lightGray2 }}
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



export const SelectHeight = ({ chosenHeight }) => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    let scrollViewRef = React.createRef()
    let textInputRef = React.createRef()
    let heightRef = React.useRef(100)
    const [userHeight, setHeight] = useState(100);
    const renderSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(heightRef)}
                min={100}
                max={301}
                vertical={true}
                selectedStyle={{ backgroundColor: '#5a8693' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: Colors.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={height * 0.15}
                step={0.5}
                customMarker={(e) => {
                    return (<View style={{
                        height: 25,
                        width: 25,
                        bottom: -height * 0.005,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: '#FEF1E6',
                        backgroundColor: '#224854',
                    }}></View>)
                }}

                onValuesChange={(value) => {
                    setHeight(Math.round(value))
                   // chosenHeight(Math.round(value))
                    
                }}
            />
        )
    }



    scrollY.addListener(({ value }) => {
        const ageValue = Math.round(value / snapTo)

        if (textInputRef && textInputRef.current) {
            textInputRef.current.setNativeProps({
                text: `${Math.round(value / snapTo)}`
            })
        }
    })

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
            justifyContent: 'flex-start',
            borderRadius: 40,
            flexDirection: 'column',
            height: height * 0.21,
            width: width * 0.45,
            alignItems: 'center',
        }}>
            <View>
                <Text style={{ fontSize: height * 0.021, color: '#8D8E98', fontWeight: 'bold', fontFamily: "Fredoka-Regular" }}>גובה</Text>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
                <View style={{ rotation: 180, height: height * 0.16, right: width * 0.07 }}>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        ref={scrollViewRef}
                        vertical
                        bounces={false}
                        scrollEventThrottle={16}
                        snapToInterval={snapTo}
                        contentContainerStyle={{

                            justifyContent: 'flex-end',
                        }}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: { y: scrollY }
                                }
                            }],
                            { useNativeDriver: true }
                        )}

                    >
                        <Ruler />
                    </Animated.ScrollView>
                </View>

                <View style={{
                    // position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    //  left: (width - indicatorWrapperWidth) / 2,
                    // bottom: 10,
                    // alignItems: 'center',
                    // justifyContent: 'space-evenly',
                    // height: indicatorWrapperWidth
                }}>

                    {/* 
                    <View style={{

                        width: 1,
                        height: width * 0.1,
                        rotation: 90,
                        backgroundColor: '#f5afaf'
                    }} /> */}


            {/* <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TextInput ref={textInputRef} style={{
                            fontFamily: "Fredoka-Regular",
                            fontSize: height * 0.05,
                            textAlign: 'center',
                            color: '#224854',
                            fontWeight: 'bold'

                        }} />
                        <View style={{left:10 }}>
                            <FontAwesome name={'long-arrow-left'} size={width * 0.06} style={{width:30}} />
                        </View>




                    </View>
                </View>


            </View> */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>



                <View style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    left: width * 0.09,
                    top: height * 0.03

                }}>
                    <Text style={{ fontFamily: "Fredoka-Regular", fontSize: height * 0.02, color: '#8D8E98', marginTop: 10, right: 6 }}>ס"מ</Text>
                    <Text style={{ fontFamily: "Fredoka-Regular", fontSize: height * 0.06, fontWeight: 'bold', color: '#224854' }}>{userHeight.toString()}</Text>

                </View>

                <View style={{ left: width * 0.01, top: height * 0.03 }}>{renderSlider()}</View>

            </View>

        </View>

        // </View>
    )

}