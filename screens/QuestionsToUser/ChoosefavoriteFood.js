import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
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
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../colors';
import Swiper from 'react-native-swiper';

// Explain row below - 
// -- create text that show in top of the page 
const Header = () => {
    return (
        <View style={{ marginTop: height * 0.05 }}>
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

const ChangePage = (page) => {
    if (page !== undefined) {
        if (page === FoodTypes.carbohydrates) {
            return 0
        }
        if (page === FoodTypes.protains) {
            return 1
        }
        if (page === FoodTypes.fats) {
            return 2
        }
        // if (page === FoodTypes.vitamins) {
        //     return 3
        // }

    } else {
        return 0
    }
}

export const ChoosefavoriteFood = ({ route, navigation }) => {
    const { chosenTarget, chosenGender, chosenHeight, chosenBirthday, chosenWeight, carbs, page, chosenProducts } = route.params

    const [currentPage, setCurrentPage] = useState(ChangePage(page));
    const [fatsItems, setFatsItems] = useState(null)
    const [carbohydratesItems, setCarbohydratesItems] = useState(carbs)
    const [protainsItems, setProtainsItems] = useState(null)
    const [favorite, setFavorite] = useState([])
    const [vitaminsItems, setVitaminsItems] = useState(null)
    const [nextPress, setNextStep] = useState(false)
    const [backPress, setBackStep] = useState(false)

    const [stratXPressLocation, setStartXPressLocation] = useState(0)
    const [stratYPressLocation, setStartYPressLocation] = useState(0)
    const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
    const renderViewPagerPage = (data) => {
        return (
            <View key={data} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>{data}</Text>
            </View>
        );
    };
    useEffect(() => {
        const change = ChangePage(page)
        setCurrentPage(change)
    }, [page])

    useEffect(() => {
        if (chosenProducts !== undefined) {
            chosenProducts.forEach((value, index) => {
                let newArr = []
                newArr = favorite.slice()
                newArr.push(value)
                setFavorite(newArr)
            })
        }
    }, [chosenProducts])

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

    const nextStep = (page) => {
        setNextStep(true)
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    }

    const preStep = () => {
        setBackStep(true)
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const RenderTitle = () => {
        let title = ''
        switch (currentPage) {
            case 0:
                title = 'בחר פחמימות האהובות עליך'
                break;

            case 1:
                title = 'בחר חלבונים האהובים עליך'
                break;

            case 2:
                title = 'בחר שומנים האהובים עליך'
                break;

            case 3:
                title = 'בחר ירקות ופירות האהובים עליך'
                break;
        }
        return (
            <View>
                <Text style={{
                    fontFamily: "Fredoka-Regular",
                    fontSize: height * 0.035,
                    textAlign: 'center',
                    color: '#224854',
                    // color: '#630000', fontWeight: 'bold', fontSize: 23, marginTop: 8, textAlign: 'center' 
                }}>{title}</Text>
            </View>
        )
    }

    const renderChooseFoodComponents = () => {

        return (
            <View>

                < FlatList
                    // onScrollEndDrag={() => console.log("end")}
                    // onScrollBeginDrag={() => console.log("start")}
                    columnWrapperStyle={{
                        // justifyContent: 'space-evenly'
                        height: height * 0.3,
                        width: width * 0.8,
                        left: width * 0.15,
                        top: height * 0.01


                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    refreshing={true}
                    data={parentItems()}
                    renderItem={({ item }) => {

                        return (
                            <View

                                style={{ flex: 1 }}>

                                <Animatable.View
                                    animation={'bounceInRight'} duration={1000}
                                    style={{ marginTop: height * 0.02 }}>

                                    < CardChooseFood
                                        plant={item}
                                        favoriteProducts={(value) => {

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
                                        }}
                                        isFavorite={favorite.includes(item["name"])}
                                    />

                                </Animatable.View>

                            </View>
                        )
                    }


                    }
                    keyExtractor={item => item["name"]}

                />
            </View>

        )
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
            <BackArrow handleBack={() => {
                currentPage === 0 ? navigation.navigate('ChooseCrabs') : preStep()
            }
            } />
        )
    }

    const createNextArrowView = () => {
        return (

            <NextArrow navigateToPageFunc={() => {

                if (currentPage < 3) {
                    nextStep()
                } else if (currentPage === 3 || page !== undefined) {
                    navigation.navigate('MainTabScreen', {
                        chosenTarget: chosenTarget,
                        chosenGender: chosenGender,
                        chosenHeight: chosenHeight,
                        chosenBirthday: chosenBirthday,
                        chosenWeight: chosenWeight,
                        chosenProducts: favorite
                    })
                }
                //    ( currentPage !== 3 )? nextStep() : navigation.navigate('MainTabScreen', {
                //         chosenTarget: chosenTarget,
                //         chosenGender: chosenGender,
                //         chosenHeight: chosenHeight,
                //         chosenBirthday: chosenBirthday,
                //         chosenWeight: chosenWeight,
                //         chosenProducts: favorite
                //     })



            }} />
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

    const aa = (page) => {
        setCurrentPage(page)
    }

    return (
        < View

            style={{
                backgroundColor: Colors.lightBlue,
                flexDirection: 'column',
                flex: 1,

                // alignItems: 'center',
                marginTop: StatusBar.currentHeight,


            }
            }
        >
            <View style={{ marginTop: height * 0.011, marginLeft: width * 0.02, justifyContent: 'center' }}>
                {createBackArrowView()}
            </View>





            <View style={{ alignSelf: 'center', flexDirection: 'column', }}>
                <View style={{ width: width * 0.9 }}>
                    <StepIndicatorComponent currentPage={currentPage} changePage={(value) => setCurrentPage(value)} />
                </View>

                <View style={{ top: height * 0.04 }}>
                    {RenderTitle()}
                </View>
            </View>



            <View




                style={{
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'flex-start',

                    backgroundColor: '#5a8693',
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 70,
                    width: width * 1.2,
                    marginTop: height * 0.08,
                    height: height * 0.45,
                    borderTopWidth: 4,
                    borderBottomWidth: 4,
                    borderColor: '#ffffff',
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 70,
                }}>

                <Animatable.View

                    animation={'bounceInRight'} duration={1000}
                    style={{ marginTop: height * 0.02, justifyContent: 'center' }}>
                    {renderChooseFoodComponents()}
                </Animatable.View>



            </View>

            <View style={{
                height: 0.08 * height,
                backgroundColor: Colors.lightBlue,
                alignItems: 'flex-end',
                justifyContent: 'center'
            }} />

            <View style={{ alignSelf: 'flex-end', marginRight: width * 0.02, marginBottom: height * 0.01, backgroundColor: Colors.lightBlue }}>

                {createNextArrowView()}
            </View>

        </View>





        // <View>
        //     <View style={{ backgroundColor: '#E4D8DC', height: height * 0.17 }} >
        //         <StatusBar translucent={false} backgroundColor={'#E4D8DC'} />
        //         <View style={{ flexDirection: 'row', backgroundColor: '#E4D8DC', justifyContent: 'space-between' }}>
        //             {createBackArrowView()}
        //             {createNextArrowView()}
        //         </View>
        //         <View >
        //             <StepIndicatorComponent currentPage={currentPage} />
        //             {RenderTitle()}
        //         </View>
        //     </View>
        //     <Animatable.View
        //         // animation={'bounceInRight'} duration={1000}
        //         style={{ backgroundColor: "white", height: height * 0.83, marginTop: height * 0.02 }}>
        //         {renderChooseFoodComponents()}
        //     </Animatable.View>
        // </View>
    );
}

