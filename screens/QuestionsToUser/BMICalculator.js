import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow';
import { RenderGenderTypes } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectGender/RenderGenderTypes'
import { SelectHeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectHeight'
import { SelectBirthday } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectBirthday'
import { SelectWeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectWeight'
import { db } from '../../config';
import { FoodTypes } from '../../constants/Logics/FoodTypes';

export const BMICalculator = ({ route, navigation }) => {
    const { targetName } = route.params

    const [gender, setGender] = useState(null)
    const [height, setHeight] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [weight, setWeight] = useState(null)
    const [carbs, setCarbs] = useState([])



    const createBackArrowView = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <BackArrow handleBack={() => navigation.navigate('ChooseTarget')} />
            </View>
        )
    }
    const createNextArrowView = () => {
        let arr = []
        const parentFoodString = "/foodType_carbohydrates"
        const parentFooddItems = db.collection(parentFoodString)
        parentFooddItems.onSnapshot((querySnapShot) =>
            querySnapShot.forEach((doc) => {
                const itemName = doc.data()["name"]
                const itemImage = doc.data()["image"]
                const obj = { name: itemName, img: itemImage }
                arr.push(obj)
            }))



        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <NextArrow navigateToPageFunc={() => navigation.navigate('ChoosefavoriteFood', {
                    chosenTarget: targetName,
                    chosenGender: gender,
                    chosenHeight: height,
                    chosenBirthday: birthday,
                    chosenWeight: weight,
                    carbs: arr

                })} />
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
                <RenderGenderTypes gender={(value) => setGender(value)} />
                <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10 }}>
                    <SelectHeight chosenHeight={(value) => setHeight(value)} />
                    <SelectBirthday birthday={(value) => setBirthday(value)} />
                </View>
                <SelectWeight selectedWeight={(value) => setWeight(value)} />
            </View>
            {createNextArrowView()}
        </SafeAreaView >


    )
}