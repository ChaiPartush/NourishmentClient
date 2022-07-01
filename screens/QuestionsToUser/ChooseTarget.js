import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, BackHandler, Dimensions, Text } from 'react-native';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
const { height } = Dimensions.get("window")
import * as Animatable from 'react-native-animatable'
import { styles } from '../../Styles/QuestionsToUserStyles/ChooseTargetStyle'
import { Colors } from '../../colors';
import { RenderTargetsAndPagination } from '../../components/QuestionsToUserScreensComponents/ChooseTargetComponents/RenderTargetsAndPagination'
import { width } from '../../constants/ScreenDimentionConst';
import { ScrollTargets } from '../../components/QuestionsToUserScreensComponents/ChooseTargetComponents/ScrollTargets';
// import { colors } from 'react-native-elements';


export const ChooseTarget = ({ navigation }) => {

    // const disableBackButton = () => {
    //     BackHandler.exitApp();
    //     return true;
    // }

    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', disableBackButton)
    // }, [])

    return (


        <Animatable.View


            // animation={'bounceInLeft'} 
            // duration={2000} 
            style={{ backgroundColor: Colors.lightBlue, flexDirection: 'column', flex: 1 }}>




            <View style={{
                // height: 0.15 * height,
                //  flexDirection: 'column',
                backgroundColor: Colors.lightBlue,
                // justifyContent: 'space-evenly',
            }}>
                <Image source={require('../../assets/shapesBackground.jpg')} resizeMode={'cover'} 
                style={{
                    flex: 1,
                    resizeMode: 'cover',
                }} />

                <View style={{
                    marginTop: height * 0.07


                }} >
                    <Text style={{


                        fontFamily: "Fredoka-Regular",
                        fontSize: height * 0.04,
                        textAlign: 'center',
                        color: '#224854',

                    }}>  כדי להתחיל את המסע שלנו  </Text>

                    <Text style={{
                        fontFamily: "Fredoka-Regular",
                        fontSize: height * 0.04,
                        textAlign: 'center',
                        color: '#224854',
                        fontWeight: 'bold'
                    }}> בואו נבחר מטרה  </Text>

                </View>
            </View>


            <View style={{ flex: 1, marginLeft: width * 0.07, marginTop: height * 0.04 }}>
                <View style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: Colors.lightBlue }]} />
                <Animatable.View
                    animation={'slideInRight'} duration={2000}

                    style={{
                        flex: 1, backgroundColor: '#5a8693', borderTopLeftRadius: 100,
                        borderLeftWidth: 4,
                        // marginTop: 40,

                        borderTopWidth: 4,
                        borderBottomWidth: 4,

                        borderColor: '#ffffff', borderBottomLeftRadius: 100, justifyContent: 'center', alignItems: 'center'
                    }}>
                    <View style={{
                        flex: 1,


                        // width: '88.9%',
                        // marginTop: height * 0.07,
                        // marginBottom: height*0.07
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <ScrollTargets onpress={(value) => navigation.navigate('BMICalculator', {
                                targetName: value
                            })} />
                        </View>
                        {/* <RenderTargetsAndPagination target={(value) => navigation.navigate('BMICalculator', {
                            targetName: value
                        })} /> */}
                    </View>

                </Animatable.View>
            </View>


            <View style={{
                height: 0.12 * height,
                backgroundColor: Colors.lightBlue,
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}>

            </View>


        </Animatable.View >
    )
}