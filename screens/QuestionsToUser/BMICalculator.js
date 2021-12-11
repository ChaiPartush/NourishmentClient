import React from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow';
import { RenderGenderTypes } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectGender/RenderGenderTypes'
import { SelectHeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectHeight'
import { SelectBirthday } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectBirthday'
import { SelectWeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectWeight'


export const BMICalculator = ({ navigation }) => {

    const createBackArrowView = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <BackArrow handleBack={() => navigation.navigate('ChooseTarget')} />
            </View>
        )
    }
    const createNextArrowView = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <NextArrow navigateToPageFunc={() => navigation.navigate('ChooseProblem')} />
            </View>
        )
    }
    const createQuestionText = () => {
        return (
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>Please Fill Some Basic </Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>Informatio About you</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>

            <View style={{ backgroundColor: '#87AAAA', height: 220 }}>
                {createBackArrowView()}
                <StatusBar translucent={false} backgroundColor={'#87AAAA'} />
                {createQuestionText()}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', marginTop: -110 }} >

                <RenderGenderTypes />

                <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10 }}>
                    <SelectHeight />
                    <SelectBirthday />
                </View>

                <SelectWeight />

            </View>
            {createNextArrowView()}

        </SafeAreaView >


    )
}