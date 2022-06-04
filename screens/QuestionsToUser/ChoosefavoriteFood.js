import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { ChooseProtains } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseProtains/ChooseProtains'
import { ChooseFats } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseFats/ChooseFats'
import { ChooseVitamins } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseVitamins/ChooseVitamins'
import { BackArrow } from '../../components/ArrowsComponents/BackArrow'
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StepIndicatorComponent } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/StepIndicatorComponent'
import { ChooseCarbohydrates } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseCarbohydrates/ChooseCarbohydrates'
import { height, width } from '../../constants/ScreenDimentionConst';
import { CardChooseFood } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/CardChooseFood'
import { FoodTypes } from '../../constants/Logics/FoodTypes'
import { db } from '../../config';



export const ChoosefavoriteFood = ({ route, navigation }) => {
    const { chosenTarget, chosenGender, chosenHeight, chosenBirthday, chosenWeight, carbs } = route.params
    const [currentPage, setCurrentPage] = useState(0);
    const [fatsItems, setFatsItems] = useState(null)
    const [carbohydratesItems, setCarbohydratesItems] = useState(carbs)
    const [protainsItems, setProtainsItems] = useState(null)
    const [favorite, setFavorite] = useState([])
    const [vitaminsItems, setVitaminsItems] = useState(null)

    const renderItems = (parentFood) => {
        let arr = []
        const parentFoodString = "/foodType_" + parentFood
        const parentFooddItems = db.collection(parentFoodString)
        parentFooddItems.onSnapshot((querySnapShot) =>
            querySnapShot.forEach((doc) => {
                const itemName = doc.data()["name"]
                const itemImage = doc.data()["image"]
                const obj = { name: itemName, img: itemImage }
                arr.push(obj)
            }))

        switch (parentFood) {
            // case FoodTypes.carbohydrates:
            //     {
            //         setCarbohydratesItems(carbs)
            //         break
            //     }
            case FoodTypes.fats:
                {
                    setFatsItems(arr)
                    break
                }
            case FoodTypes.protains:
                {
                    setProtainsItems(arr)
                    break
                }
            case FoodTypes.vitamins:
                {
                    setVitaminsItems(arr)
                    break
                }
        }

    }


    useEffect(() => {
        // if (carbohydratesItems === null) {
        //     renderItems(FoodTypes.carbohydrates)
        // }
        if (fatsItems === null) {
            renderItems(FoodTypes.fats)
        }
        if (protainsItems === null) {
            renderItems(FoodTypes.protains)
        }
        if (vitaminsItems === null) {
            renderItems(FoodTypes.vitamins)
        }
    })



    const renderSearch = () => {
        return (
            <View style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginHorizontal: 24,
                marginVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: '#F5F5F8'
            }}>
                <Image
                    source={require("../../assets/icons/search.png")}
                    style={{ height: 20, width: 20, tintColor: '#000000' }}
                />

                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: 12,
                        fontSize: 16,
                        lineHeight: 22,
                    }}
                    placeholder="Search Food..."
                    onChangeText={text => {
                        if (text != '') {
                            setSearchIsOn(true)
                            search(text)
                        }
                        else {
                            setSearchIsOn(false)
                        }
                        rederPopularSection()

                    }}
                />



            </View>
        )
    }

    const nextStep = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    }
    const preStep = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const RenderTitle = () => {
        let title = ''
        switch (currentPage) {
            case 0:
                title = 'Choose your favorete crabs'
                break;

            case 1:
                title = 'Choose your favorete protains'
                break;

            case 2:
                title = 'Choose your favorete Fats'
                break;

            case 3:
                title = 'Choose your favorete Vitamins'
                break;
        }
        return (
            <View>
                <Text style={{ color: '#630000', fontWeight: 'bold', fontSize: 23, marginTop: 25, textAlign: 'center' }}>{title}</Text>
            </View>
        )
    }

    const renderChooseFoodComponents = () => {

        return (

            < FlatList
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                refreshing={true}
                data={parentItems()}
                renderItem={({ item }) => {
                    return (
                        <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: "white", marginTop: height * 0.02 }}>
                            < CardChooseFood plant={item} favoriteProducts={(value) => {

                                if (value["type"] === true) {
                                    const name = value["name"]
                                    let newArr = []
                                    newArr = favorite.slice()
                                    newArr.push(name)
                                    setFavorite(newArr)

                                } else if (value["type"] === false) {
                                    const name = value["name"]
                                    let newArr = []
                                    newArr = favorite.slice()
                                    const itemIndex = newArr.indexOf(name)
                                    newArr.splice(itemIndex, 1)
                                    setFavorite(newArr)
                                }
                            }} />

                        </Animatable.View>)
                }


                }
                keyExtractor={item => item["name"]}

            />)
    }
    const parentItems = () => {

        switch (currentPage) {
            case 0: {
                return carbohydratesItems
            }
            case 1: {
                return protainsItems
            }
            case 2: {
                return fatsItems
            }
            case 3: {
                return vitaminsItems
            }
        }
    }
    const createBackArrowView = () => {
        return (
            <View style={{ backgroundColor: '#E4D8DC' }}>
                <BackArrow handleBack={() => {
                    currentPage === 0 ? navigation.navigate('ChooseCrabs') : preStep()
                }
                } />
            </View>
        )
    }
    const createNextArrowView = () => {
        return (
            <View style={{ backgroundColor: '#E4D8DC' }}>
                <NextArrow navigateToPageFunc={() => {
                    currentPage !== 3 ? nextStep() : navigation.navigate('MainTabScreen', {
                        chosenTarget: chosenTarget,
                        chosenGender: chosenGender,
                        chosenHeight: chosenHeight,
                        chosenBirthday: chosenBirthday,
                        chosenWeight: chosenWeight,
                        chosenProducts: favorite
                    })



                }} />
            </View>
        )
    }
    const renderSearchBar = () => {
        return (
            <View style={{ height: 60, width: '100%', backgroundColor: 'white', borderRadius: 10, position: 'absolute', top: 125, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', elevation: 12, marginLeft: 3 }}>
                <MaterialIcons name='search' size={28} />
                <TextInput placeholder="Search place" />
            </View>
        )
    }

    return (
        <View>
            <View style={{ backgroundColor: '#E4D8DC', height: height * 0.17 }} >
                <StatusBar translucent={false} backgroundColor={'#E4D8DC'} />
                <View style={{ flexDirection: 'row', backgroundColor: '#E4D8DC', justifyContent: 'space-between' }}>
                    {createBackArrowView()}
                    {createNextArrowView()}
                </View>
                <View >
                    <StepIndicatorComponent currentPage={currentPage} />
                    {RenderTitle()}
                </View>
            </View>
            <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: "white", height: height * 0.83, marginTop: height * 0.02 }}>
                {renderChooseFoodComponents()}
            </Animatable.View>
        </View>
    );
}

