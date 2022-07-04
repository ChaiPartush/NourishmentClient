import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, Text, Dimensions } from 'react-native';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow';
import { RenderGenderTypes } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectGender/RenderGenderTypes'
import { SelectHeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectHeight'
import { SelectBirthday } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectBirthday'
import { SelectWeight } from '../../components/QuestionsToUserScreensComponents/BMIComponents/SelectWeight'
import { db } from '../../config';
import { Colors } from '../../colors';
import { FoodTypes } from '../../constants/Logics/FoodTypes';
const { height, width } = Dimensions.get("window")




export const BMICalculator = ({ route, navigation }) => {
    const { targetName } = route.params

    const [gender, setGender] = useState(null)
    const [userHeight, setUserHeight] = useState(null)
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


    // Explain row below - 
    // -- create text that show in top of the page 
    const Header = () => {
        return (
            <View style={{ marginTop: height * 0.07 }}>
                <Text style={{
                    fontFamily: "Fredoka-Regular",
                    fontSize: height * 0.035,
                    textAlign: 'center',
                    color: '#224854',
                }}>  אחרי שבחרנו מטרה   </Text>

                <Text style={{
                    fontFamily: "Fredoka-Regular",
                    fontSize: height * 0.04,
                    textAlign: 'center',
                    color: '#224854',
                    fontWeight: 'bold'
                }}> בואו נבין את מצב הגוף </Text>

            </View>
        )
    }


    return (
        /* Explain row below - container that we put inside it all the components in page  */


        < View style={{
            backgroundColor: Colors.lightBlue,
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center'
        }
        }>


            {/* Explain row below - text in the top of page*/}
            <Header />

            {/* Explain row below - container of birthday,height,weight and gender cards*/}
            <View style={{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: '#5a8693',
                borderTopLeftRadius: 100,
                borderTopRightRadius: 70,
                width: width * 1.2,
                marginTop: 20,
                height: height * 0.45,
                borderTopWidth: 4,
                borderBottomWidth: 4,
                borderColor: '#ffffff',
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 70,
            }}>

                {/* Explain row below - gender row caeds*/}
                <RenderGenderTypes gender={(value) => setGender(value)} />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // margin: 20,
                    top:height*0.024,
                    marginTop: 17,

                    // width:width*0.98,
                }}>
                    <View style={{ marginRight: width * 0.03 }}>
                        <SelectHeight chosenHeight={(value) => setUserHeight(value)} />
                    </View>

                    <SelectBirthday birthday={(value) => setBirthday(value)} />
                </View>
                
                <View style={{marginTop:height*0.08}}>
                    <SelectWeight selectedWeight={(value) => setWeight(value)} />
                </View>















            </View>

            <View style={{
                height: 0.1 * height,
                backgroundColor: Colors.lightBlue,
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}>

            </View>





        </View >
        // <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>
        //     <View style={{ backgroundColor: '#87AAAA', height: 220 }}>
        //         {createBackArrowView()}
        //         <StatusBar translucent={false} backgroundColor={'#87AAAA'} />
        //         {createQuestionText()}
        //     </View>
        //     <View style={{ flex: 1, flexDirection: 'column', marginTop: -110 }} >
        //         <RenderGenderTypes gender={(value) => setGender(value)} />
        //         <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10 }}>
        //             <SelectHeight chosenHeight={(value) => setHeight(value)} />
        //             <SelectBirthday birthday={(value) => setBirthday(value)} />
        //         </View>
        //         <SelectWeight selectedWeight={(value) => setWeight(value)} />
        //     </View>
        //     {createNextArrowView()}
        // </SafeAreaView >


    )
}