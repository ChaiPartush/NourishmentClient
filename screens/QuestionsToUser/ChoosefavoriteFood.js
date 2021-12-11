import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { StatusBar } from 'react-native';
import { ChooseProtains } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseProtains/ChooseProtains'
import { ChooseFats } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseFats/ChooseFats'
import { ChooseVitamins } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseVitamins/ChooseVitamins'
import { BackArrow } from '../../components/ArrowsComponents/BackArrow'
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StepIndicatorComponent } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/StepIndicatorComponent'
import { ChooseCarbohydrates } from '../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseCarbohydrates/ChooseCarbohydrates'


export const ChoosefavoriteFood = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {

    }, [])


    // const search = (textToSearch) => {
    //     let selectedPopular = dummyData.menu.find(a => a.name == "Popular")
    //     setFilteredPopular(selectedPopular.list.filter(a => a.name.toLowerCase().startsWith(textToSearch.toLowerCase())))
    // }
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
        switch (currentPage) {
            case 0:
                return <ChooseCarbohydrates />
            case 1:
                return <ChooseProtains />
            case 2:
                return <ChooseFats />
            case 3:
                return <ChooseVitamins />
        }
        return null;
    }
    const createBackArrowView = () => {
        return (
            <View style={{ backgroundColor: '#E4D8DC' }}>
                <BackArrow handleBack={() => currentPage == 0 ? navigation.navigate('ChooseCrabs') : preStep()} />
            </View>
        )
    }
    const createNextArrowView = () => {
        return (
            <View style={{ flexDirection: 'row', flex: 1, left: 20 }}>
                <NextArrow navigateToPageFunc={() => { currentPage !== 3 ? nextStep() : navigation.navigate('MainTabScreen') }} />
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
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            {createBackArrowView()}
            <StatusBar translucent={false} backgroundColor={'#E4D8DC'} />
            <View style={{ backgroundColor: '#E4D8DC', height: 160, paddingHorizontal: 20 }}>
                <View style={{ backgroundColor: '#E4D8DC' }}>
                    <StepIndicatorComponent currentPage={currentPage} />
                    {RenderTitle()}
                    {renderSearchBar()}
                </View>
            </View>
            <View
                style={{ flexDirection: 'column', flex: 1 }}>
                {renderChooseFoodComponents()}
            </View>
            {createNextArrowView()}
        </View >
    );
}

