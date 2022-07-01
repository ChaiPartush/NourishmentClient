import React from 'react'
import { View, Text } from 'react-native'
import { width, height } from '../../../constants/ScreenDimentionConst'
import { Colors } from '../../../colors'
import { TargetType } from '../../../constants/Logics/ChangeCaloriesByTargetConsts'
import AwesomeButton from "react-native-really-awesome-button"
import * as Animatable from 'react-native-animatable'


export const ScrollTargets = ({ onpress }) => {

    return (
        <Animatable.View style={{
            // flexDirection: 'column',
            // flex: 1,
            // alignItems: 'center',
            // justifyContent: 'space-between',
            marginTop: height * 0.06,
            marginBottom: 50
        }}>

            {
                // explain row below -  create GainWeight card 
            }

            <Animatable.View animation={'fadeInRight'} delay={500} style={{ marginBottom: 15, }} >
                <AwesomeButton
                    type="facebook"
                    onPress={() => onpress(TargetType.GainWeight)}
                    width={width * 0.70}
                    height={height * 0.17}
                    borderRadius={15}
                    backgroundColor={'#d6ced8'}
                    backgroundDarker={'#5a8693'}
                    borderColor={Colors.lightBlue}
                    borderWidth={3}
                    raiseLevel={8}
                >
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.03 }}>עלייה במשקל</Text>



                        </View>

                    </View>



                </AwesomeButton>
            </Animatable.View>

            {
                // explain row below -  create netrallyWeight card 
            }
            <Animatable.View animation={'fadeInRight'} delay={700} style={{ marginBottom: 15 }} >
                <AwesomeButton

                    type="facebook"
                    onPress={() => onpress(TargetType.BalancedDiet)}
                    width={width * 0.70}
                    height={height * 0.17}
                    borderRadius={15}
                    backgroundColor={'#d6ced8'}
                    backgroundDarker={'#5a8693'}
                    borderColor={Colors.lightBlue}
                    borderWidth={3}
                    raiseLevel={8}
                >

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06}
                        color="white"
                    /> */}
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.03 }}>משקל קבוע</Text>



                        </View>

                    </View>

                </AwesomeButton>
            </Animatable.View>


            {
                // explain row below -  create lossWeight card
            }
            <Animatable.View animation={'fadeInRight'} delay={900} >
                <AwesomeButton

                    type="facebook"
                    onPress={() => onpress(TargetType.LossWeight)}
                    width={width * 0.70}
                    height={height * 0.17}
                    borderRadius={15}
                    backgroundColor={'#d6ced8'}
                    backgroundDarker={'#5a8693'}
                    borderColor={Colors.lightBlue}
                    borderWidth={3}
                    raiseLevel={8}
                >

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <AntDesign
                        style={{}}
                        name="twitter"
                        size={height * 0.06


                        }
                        color="white"
                    /> */}
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={{ marginTop: 10, color: '#224854', fontFamily: "Fredoka-Regular", fontSize: height * 0.03 }}>ירידה במשקל</Text>



                        </View>

                    </View>

                </AwesomeButton>
            </Animatable.View>

        </Animatable.View >
    )

}
