import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, Dimensions, Text } from 'react-native';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
const { height } = Dimensions.get("window")
import * as Animatable from 'react-native-animatable'
import { styles } from '../../Styles/QuestionsToUserStyles/ChooseTargetStyle'
import { RenderTargetsAndPagination } from '../../components/QuestionsToUserScreensComponents/ChooseTargetComponents/RenderTargetsAndPagination'
import { width } from '../../constants/ScreenDimentionConst';

export const ChooseTarget = ({ navigation }) => {

    const disableBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', disableBackButton)
    }, [])

    return (
        <Animatable.View animation={'bounceInLeft'} duration={2000} style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.slider}>
                <View style={{ alignItems: 'flex-end', marginRight: width * 0.03 }}>
                    {/* <NextArrow navigateToPageFunc={() => navigation.navigate('BMICalculator')} /> */}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose your Target</Text>
                </View>
            </View>


            <View style={{ flex: 1 }}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "#FFE4D9" }]} />
                <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 75, borderBottomLeftRadius: 75, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '88.9%', marginTop: height * 0.04, marginBottom: 25 }}>
                        <RenderTargetsAndPagination target={(value) => navigation.navigate('BMICalculator', {
                            targetName: value
                        })} />
                    </View>

                </View>
            </View>


            <View style={styles.slider1}>

            </View>

        </Animatable.View>
    )
}