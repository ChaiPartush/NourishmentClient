import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Text, Image, TextInput, FlatList, SafeAreaView, ScrollView } from 'react-native';
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
import { swiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../colors';
// import Swiper from 'react-native-swiper';
import { SwiperComponent } from '../../components/Swiper';
import { index } from 'mathjs';
import { addAbortSignal } from 'stream';
import { Stteper } from './stteper';
const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];

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
            }}>  ???????? ???????????? ????????   </Text>

            <Text style={{
                fontFamily: "Fredoka-Regular",
                fontSize: height * 0.04,
                textAlign: 'center',
                color: '#224854',
                fontWeight: 'bold'
            }}> ???????? ???????? ???? ?????? ???????? </Text>

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
    const [currentPage, setCurrentPage] = React.useState(ChangePage(page));
    const [fatsItems, setFatsItems] = useState(null)
    const [carbohydratesItems, setCarbohydratesItems] = useState(null)
    const [protainsItems, setProtainsItems] = useState(null)
    const [favorite, setFavorite] = useState([])
    const [vitaminsItems, setVitaminsItems] = useState(null)
    const [nextPress, setNextStep] = useState(false)
    const [backPress, setBackStep] = useState(false)
    const [allowScroll, setAloowScroll] = useState(true)
    const [isScroll, setIsScroll] = useState(false)
    const [visible, setVisible] = useState(true)
    const btnRef = useRef(null);
    let swipe = useRef(0)





    const [stratXPressLocation, setStartXPressLocation] = useState(0)
    const [stratYPressLocation, setStartYPressLocation] = useState(0)
    const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

    const alphabeticalOrder = (arr) => {
        return arr.sort((a, b) => a.hebrewName < b.hebrewName ? -1 : 1)
    }

    useEffect(() => {
        if (carbohydratesItems === null) {
            const parentFoodString = "/foodType_" + FoodTypes.carbohydrates
            const parentFooddItems = db.collection(parentFoodString)
            parentFooddItems.onSnapshot((querySnapShot) => {
                let arr = []
                querySnapShot.forEach((doc) => {
                    const itemName = doc.data()["name"]
                    const itemImage = doc.data()["image"]
                    const itemHebrewName = doc.data()["hebrewName"]
                    const obj = { name: itemName, img: itemImage, hebrewName: itemHebrewName }
                    arr.push(obj)


                })
                setCarbohydratesItems(alphabeticalOrder(arr))
            })
        }
    }, [carbohydratesItems])


    useEffect(() => {
        if (protainsItems === null) {
            const parentFoodString = "/foodType_" + FoodTypes.protains
            const parentFooddItems = db.collection(parentFoodString)
            parentFooddItems.onSnapshot((querySnapShot) => {
                let arr = []
                querySnapShot.forEach((doc) => {
                    const itemName = doc.data()["name"]
                    const itemImage = doc.data()["image"]
                    const itemHebrewName = doc.data()["hebrewName"]
                    const obj = { name: itemName, img: itemImage, hebrewName: itemHebrewName }
                    arr.push(obj)


                })
                setProtainsItems(alphabeticalOrder(arr))
            })
        }
    }, [protainsItems])

    useEffect(() => {
        if (vitaminsItems === null) {
            const parentFoodString = "/foodType_" + FoodTypes.vitamins
            const parentFooddItems = db.collection(parentFoodString)
            parentFooddItems.onSnapshot((querySnapShot) => {
                let arr = []
                querySnapShot.forEach((doc) => {
                    const itemName = doc.data()["name"]
                    const itemImage = doc.data()["image"]
                    const itemHebrewName = doc.data()["hebrewName"]
                    const obj = { name: itemName, img: itemImage, hebrewName: itemHebrewName }
                    arr.push(obj)


                })
                setVitaminsItems(alphabeticalOrder(arr))
            })
        }
    }, [vitaminsItems])

    useEffect(() => {
        if (fatsItems === null) {
            const parentFoodString = "/foodType_" + FoodTypes.fats
            const parentFooddItems = db.collection(parentFoodString)
            parentFooddItems.onSnapshot((querySnapShot) => {
                let arr = []
                querySnapShot.forEach((doc) => {
                    const itemName = doc.data()["name"]
                    const itemImage = doc.data()["image"]
                    const itemHebrewName = doc.data()["hebrewName"]
                    const obj = { name: itemName, img: itemImage, hebrewName: itemHebrewName }
                    arr.push(obj)


                })
                setFatsItems(alphabeticalOrder(arr))
            })
        }
    }, [fatsItems])
    // const renderViewPagerPage = (data) => {
    //     return (
    //         <View key={data} style={{
    //             flex: 1,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //         }}>
    //             <Text>{data}</Text>
    //         </View>
    //     );
    // };

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

    //useEffect(() => { console.log('ss') }, [swipe.current])


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
        parentFooddItems.onSnapshot((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                const itemName = doc.data()["name"]
                const itemImage = doc.data()["image"]
                const itemHebrewName = doc.data()["hebrewName"]
                const obj = { name: itemName, img: itemImage, hebrewName: itemHebrewName }
                arr.push(obj)

            })
        })

        switch (parentFood) {
            case FoodTypes.carbohydrates:
                {
                    setCarbohydratesItems(arr)
                    break
                }
            case FoodTypes.fats:
                {
                    const newArray = alphabeticalOrder(arr)
                    setFatsItems(alphabeticalOrder(newArray))
                    break
                }
            case FoodTypes.protains:
                {
                    setProtainsItems(alphabeticalOrder(arr))
                    break
                }
            case FoodTypes.vitamins:
                {
                    setVitaminsItems(alphabeticalOrder(arr))
                    break
                }
        }

    }






    useEffect(() => {
        if (carbohydratesItems === null) {
            renderItems(FoodTypes.carbohydrates)
        }
        if (fatsItems === null) {
            renderItems(FoodTypes.fats)
        }
        if (protainsItems === null) {
            renderItems(FoodTypes.protains)
        }
        if (vitaminsItems === null) {
            renderItems(FoodTypes.vitamins)
        }
    }, [fatsItems, protainsItems, vitaminsItems])

    const renderSearch = () => {
        return (
            <View style={{
                flexDirection: 'row',
                height: height * 0.06,
                width: width * 0.6,

                alignItems: 'center',

                justifyContent: 'flex-start',
                // marginHorizontal: 24,
                // marginVertical: 8,
                paddingHorizontal: 12,

                borderRadius: 20,
                backgroundColor: Colors.lightBlue,
                borderWidth: 3,
                borderColor: '#d6ced8'

            }}>
                <Image
                    source={require("../../assets/icons/search.png")}
                    style={{ height: 20, width: 20, tintColor: '#5a8693' }}
                />

                <TextInput

                    style={{
                        flex: 1,
                        marginLeft: 12,
                        fontSize: 16,
                        lineHeight: 22,
                    }}
                    placeholder="?????????? ????????..."

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
                title = '?????? ?????????????? ?????????????? ????????'
                break;

            case 1:
                title = '?????? ?????????????? ?????????????? ????????'
                break;

            case 2:
                title = '?????? ???????????? ?????????????? ????????'
                break;

            case 3:
                title = '?????? ?????????? ???????????? ?????????????? ????????'
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
    const renderItem = ({ item, index }) => {

        return (
            <View

                style={{ flex: 1 }}
            >


                <Animatable.View
                    animation={'bounceInRight'} duration={1000}

                    style={{
                        right: index % 2 === 1 ? width * 0.4 : -width * 0.4,

                        // left: index % 2 === 0 ? width * 0.1 : 0


                    }}>



                    < CardChooseFood

                        plant={item}
                        isScroll={isScroll}
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
                        }
                        }
                        isFavorite={favorite.includes(item["name"])}
                    />


                </Animatable.View>


            </View>
        )
    }

    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={{ color: 'transparent' }}
            //  onPress={() => console.log(item)}
            >
                No Data Found
            </Text>
        );
    };

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




    const renderChooseFoodComponents = () => {

        return (
            < FlatList



                scrollEnabled={allowScroll}
                columnWrapperStyle={{

                    height: height * 0.33,
                    width: width * 0.8,
                    left: width * 0.15,
                    top: height * 0.01,

                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                horizontal={false}



                data={parentItems()}
                renderItem={renderItem}
                keyExtractor={item => item.name.toString()}
            />
        )
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
            <NextArrow

                navigateToPageFunc={() => {

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
        swipe.current = true
    }

    let yy = useRef(null)

    const ui = (page) => {
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
            }}
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

                <View>

                </View>
            </View>





            <Animatable.View
                animation={'bounceInRight'} duration={1500} delay={100}

                onTouchStart={(e) => {
                    setStartXPressLocation(e.nativeEvent.locationX)
                    setStartYPressLocation(e.nativeEvent.locationY)
                }}

                onTouchMove={(e) => {

                    const yDistance = Math.abs(e.nativeEvent.locationY - stratYPressLocation)
                    const xDistance = Math.abs(e.nativeEvent.locationX - stratXPressLocation)

                    if (e.nativeEvent.locationX < stratXPressLocation && xDistance > yDistance && xDistance > width * 0.01) {
                        setAloowScroll(false)
                        setCurrentPage(currentPage + 1)
                        setAloowScroll(true)

                    }
                    if (e.nativeEvent.locationX > stratXPressLocation && xDistance > yDistance && xDistance > width * 0.01) {
                        setAloowScroll(false)
                        setCurrentPage(currentPage - 1)
                        setAloowScroll(true)

                    }

                    setStartXPressLocation(e.nativeEvent.locationX)
                    setStartYPressLocation(e.nativeEvent.locationY)


                }}





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

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: width * 0.05, top: height * 0.02 }}>
                    {renderSearch()}

                </View>







                {/* <SwiperComponent currentPage={currentPage}
                changePage={(value) => setCurrentPage(value)}
                /> */}

                {/* <Swiper
                    style={{ flexGrow: 1 }}
                    showsPagination={false}
                    index={currentPage}
                    loop={false}
                    onIndexChanged={(page) => {
                        return (
                            setCurrentPage(page))
                    }}
                >
                    {PAGES.map((page) => {
                        return (
                            renderViewPagerPage(page)
                        )
                    }
                    )}
                </Swiper> */}
                <Animatable.View

                    animation={'bounceInRight'} duration={1000}
                    style={{ marginTop: height * 0.02, justifyContent: 'center' }}>
                    {renderChooseFoodComponents()}
                </Animatable.View>
            </Animatable.View>

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
    )
}

