import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListCarbohydratesComponent } from './CategoryListCarbohydratesComponent'
import { CardChooseCarbohydratesComponent } from './CardChooseCarbohydratesComponent'

export const ChooseCarbohydrates = () => {
    const [itemToRender, setItemToRender] = useState(5)
    const [searchIsOn, setSearchIsOn] = useState(false)
    const [popular, setPopular] = useState([])
    const [menuList, setMenuList] = useState([])
    const [selectedMenuType, setSelectedMenuType] = useState(1)

    const rederPopularSection = () => {
        const data = searchIsOn ? filteredPopular : popular
        return (
            <View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'center', marginTop: -50 }}>{
                    data.map((item, index) => {
                        if (index + 1 <= itemToRender) {
                            return (
                                <View key={item.id}>
                                    <CardChooseCarbohydratesComponent containerStyle={{ margin: 8 }} item={item} />
                                </View>)
                        }
                    })}
                </View>
            </View>
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
        <View style={{ flexDirection: 'column', height: '100%' }}>

            <Animatable.View animation={'bounceInLeft'} duration={2000} style={{ flexDirection: 'row', height: height * 0.13 }}>
                <CategoryListCarbohydratesComponent setPopular={(value) => setPopular(value)} setMenuList={(value) => setMenuList(value)} selectedMenuType={selectedMenuType} />
            </Animatable.View>

            <View style={{ flexDirection: 'column', height: height * 0.5 }}>

                <ScrollView onMomentumScrollEnd={(e) => renderMoreCardWhenScrolling(e)}>
                    <Animatable.View animation={'bounceInRight'} duration={2000}>
                        {rederPopularSection()}
                    </Animatable.View>
                </ScrollView>

            </View>

        </View>
    )

}