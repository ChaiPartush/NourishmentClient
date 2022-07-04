import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width, height } from '../../../constants/ScreenDimentionConst'
import { COLORS } from '../../../constants/Colors';
import AwesomeButton from "react-native-really-awesome-button"
import { styles } from '../../../Styles/QuestionsToUserStyles/BmiComponentsStyle/SelectWeightStyle'

export const SelectWeight = ({ selectedWeight }) => {
    const [weight, setWeight] = useState(20.0);
    const createWeightMoltiSlider = () => {
        return (
            <MultiSlider
                value={parseFloat(weight)}
                min={20.0}
                max={150.0}
                step={0.01}
                selectedStyle={{ backgroundColor: '#5a8693' }}
                unselectedStyle={{ backgroundColor: '#B2B1B9' }}
                trackStyle={{ height: 8, borderRadius: 8, backgroundColor: COLORS.lightGray2 }}
                touchDimensions={{ borderRadius: 100 }}
                sliderLength={width * 0.75}
                customMarker={(e) => {
                    return (
                        <View>
                            <View
                                style={{
                                    height: 25,
                                    width: 25,
                                    borderRadius: 18,
                                    bottom: -height * 0.003,
                                    borderWidth: 1,
                                    borderColor: '#FEF1E6',
                                    backgroundColor: '#224854',
                                }}
                            ></View>
                        </View>
                    )
                }}
                onValuesChange={(value) => {

                    setWeight(value)
                    //   selectedWeight(value[0])
                }}
            />
        )
    }
    return (
        <View style={{
            backgroundColor: '#d6ced8',
            justifyContent: 'flex-start',
            borderRadius: 40,
            flexDirection: 'row',
            alignSelf: 'center',
            // flex: 1,
            // height: height * 0.21,
            width: width * 0.95,
            height: height * 0.16
            // alignItems: 'center',
            // justifyContent:'center'
        }}>
            <View style={{
                left: 17,
                // flex: 1,
                // margin: 10,

                // alignContent: 'center',
                // width: width / 3,
                // elevation: 12,
                // height: height / 5,

                // marginRight: (1 * width) / 100,
                // marginLeft: (1 * width) / 100,
                // marginTop: (1 * height) / 100,
                // marginBottom: (1 * height) / 100,
                // borderRadius: 10,
                // flex: 1,
                // elevation: 12,
                // backgroundColor: '#d6ced8',
                //  borderRadius: 40,

                // flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center'
            }}>
                <View style={{
                    // flexDirection: 'column',
                    // flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: height * 0.021, color: '#8D8E98', fontWeight: 'bold', fontFamily: "Fredoka-Regular", left: width * 0.05
                    }}>משקל</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <AwesomeButton
                            type="facebook"
                            onPress={() => setWeight(weight - 0.1)}
                            width={width * 0.16}
                            height={height * 0.034}
                            borderRadius={12}
                            backgroundColor={'#d6ced8'}
                            backgroundDarker={'#5a8693'}
                            borderColor={'#d6ced8'}
                            borderWidth={2}
                            raiseLevel={1}
                            style={{ left: 1, top: 24 }}
                        >
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ top: 1, left: 3, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.016 }}>   ק"ג 0.1 - </Text>



                                </View>

                            </View>



                        </AwesomeButton>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', left: width * 0.04, top: height * 0.008 }}>


                            <Text style={{
                                fontFamily: "Fredoka-Regular", fontSize: height * 0.02, color: '#8D8E98', marginTop: 10, right: 6
                            }}>ק"ג</Text>
                            <Text style={{
                                fontFamily: "Fredoka-Regular", fontSize: height * 0.06, fontWeight: 'bold', color: '#224854'
                            }}>{parseFloat(weight).toFixed(1).toString()}</Text>

                        </View>

                        <AwesomeButton
                            type="facebook"
                            onPress={() => setWeight(weight + 0.1)}
                            width={width * 0.16}
                            height={height * 0.034}
                            borderRadius={12}
                            backgroundColor={'#d6ced8'}
                            backgroundDarker={'#5a8693'}
                            borderColor={'#d6ced8'}
                            borderWidth={2}
                            raiseLevel={1}
                            style={{ left: 40, top: 24 }}
                        >
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={{ top: 1, left: 3, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.016 }}>   ק"ג 0.1 + </Text>



                                </View>

                            </View>



                        </AwesomeButton>
                    </View>
                    <View style={{
                        // flexDirection: 'row',
                        // alignItems: 'center'
                        left: 20

                    }}>{createWeightMoltiSlider()}</View>
                </View>
            </View>
        </View>
    )

}