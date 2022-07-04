// Explain import below - basic react components
import React, { useEffect, useState } from 'react'

// Explain import below - react native components 
import { View, Text } from 'react-native'

// Explain import below - slider component
import MultiSlider from '@ptomasroos/react-native-multi-slider'

//Explain import below - colors names object 
import { Colors } from '../../../colors'

// Explain import below - width and height of the screen
import { width, height } from '../../../constants/ScreenDimentionConst'
import AwesomeButton from "react-native-really-awesome-button"
import { TouchableOpacity } from 'react-native-gesture-handler'



// Function explanation - create component to allow user choose height 

export const SelectHeight = ({ chosenHeight }) => {
    // explain row below - variable that save current choosen height 
    const [userHeight, setHeight] = useState(100);
    const [inPress, setIsPress] = useState({ state: false })

    // Function explanation - create slider to choose number from number between 100 cm to 300 cm
    const renderSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(userHeight)}
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

    return (
        /* create card that hold all part of height choose and create column in card   */
        <View style={{
            backgroundColor: '#d6ced8',
            justifyContent: 'flex-start',
            borderRadius: 40,
            flexDirection: 'column',
            height: height * 0.21,
            width: width * 0.45,
            alignItems: 'center',
        }}>


            {/* create first row in card*/}
            <View>
                {/* create the header of card in this row */}
                <Text style={{ fontSize: height * 0.021, color: '#8D8E98', fontWeight: 'bold', fontFamily: "Fredoka-Regular" }}>גובה</Text>
            </View>

            {/* create second row in card  */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                {/* create row inside this row */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    left: width * 0.12,
                    top: height * 0.01

                }}>
                    {/* create text that represent the height that chosen by user */}
                    <Text style={{ fontFamily: "Fredoka-Regular", fontSize: height * 0.02, color: '#8D8E98', marginTop: 10, right: 6 }}>ס"מ</Text>
                    <Text style={{ fontFamily: "Fredoka-Regular", fontSize: height * 0.06, fontWeight: 'bold', color: '#224854' }}>{userHeight.toString()}</Text>

                </View>










                {/* add slider to row */}
                <View style={{ left: width * 0.04, top: height * 0.03 }}>
                    {renderSlider()}
                </View>






            </View>



            <View style={{ flexDirection: 'row', right: 18, bottom: 7 }}>
                <View style={{ left: 8, top: 20 }}>
                    <TouchableOpacity >
                        <View




                        >



                            <AwesomeButton

                                type="facebook"
                                // onPress={() => {

                                //     setHeight(userHeight - 1)
                                // }}

                                width={width * 0.16}
                                height={height * 0.034}
                                borderRadius={12}
                                backgroundColor={'#d6ced8'}
                                backgroundDarker={'#5a8693'}
                                borderColor={'#d6ced8'}
                                borderWidth={2}
                                raiseLevel={1}

                            >
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ top: 1, left: 3, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.016 }}>   ס"מ 1 - </Text>



                                    </View>

                                </View>



                            </AwesomeButton>


                        </View >
                    </TouchableOpacity>
                </View>
                <View style={{ left: 8, top: 20 }}>
                    <TouchableOpacity onPressIn={() => setHeight(userHeight + 1)} >
                        <AwesomeButton
                            type="facebook"
                            // onPress={() => setHeight(userHeight + 1)}
                            width={width * 0.16}
                            height={height * 0.034}
                            borderRadius={12}
                            backgroundColor={'#d6ced8'}
                            backgroundDarker={'#5a8693'}
                            borderColor={'#d6ced8'}
                            borderWidth={2}
                            raiseLevel={1}

                        >
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ top: 1, left: 3, color: '#224854', fontWeight: '300', fontFamily: "Fredoka-Regular", fontSize: height * 0.016 }}>   ס"מ 1 + </Text>



                                </View>

                            </View>



                        </AwesomeButton>
                    </TouchableOpacity>
                </View>


            </View>



        </View >

    )

}