import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListCarbohydratesComponent } from './CategoryListCarbohydratesComponent'
import { CardChooseCarbohydratesComponent } from './CardChooseCarbohydratesComponent'
import { plants } from '../../../../../constants/Data/QuestionsToUser/ChooseFats/plants'
import { CardChooseFood } from '../CardChooseFood'
import { flatten } from 'mathjs'

export const ChooseCarbohydrates = ({ items, page }) => {
    const [itemToRender, setItemToRender] = useState(5)
    const [searchIsOn, setSearchIsOn] = useState(false)
    const [popular, setPopular] = useState([])
    const [currentPage, setCurrentPage] = useState(page)
    const [menuList, setMenuList] = useState([])
    const [selectedMenuType, setSelectedMenuType] = useState(1)
    const [favorite, setFavorite] = useState([])
    itemsFavorite = []
    let currentItems = items



    const rederPopularSection = () => {
        return (
            < FlatList
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={currentItems}
                renderItem={({ item }) => {
                    return <CardChooseFood plant={item} favoriteProducts={(value) => {

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
                }}
            />

        )
    }
    const renderMoreCardWhenScrolling = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrolledToBottom = scrollViewHeight + scrollPosition;
        if (isScrolledToBottom >= (contentHeight - 30) && itemToRender <= popular.length) {
            setItemToRender(itemToRender + 5);
        }

    }

    return (
        // <View style={{}}>

        /* <Animatable.View animation={'bounceInLeft'} duration={2000} style={{ flexDirection: 'row', height: height * 0.13 }}>
            <CategoryListCarbohydratesComponent setPopular={(value) => setPopular(value)} setMenuList={(value) => setMenuList(value)} selectedMenuType={selectedMenuType} />
        </Animatable.View> */

        <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: "white", height: height * 0.83, marginTop: height * 0.02 }}>
            {/* <ScrollView onMomentumScrollEnd={(e) => renderMoreCardWhenScrolling(e)}> */}
            {/* <Animatable.View animation={'bounceInRight'} duration={2000}> */}
            {rederPopularSection()}
            {/* {console.log(favorite)} */}


            {/* </Animatable.View> */}
            {/* </ScrollView> */}

        </Animatable.View>


        // </View>
    )

}