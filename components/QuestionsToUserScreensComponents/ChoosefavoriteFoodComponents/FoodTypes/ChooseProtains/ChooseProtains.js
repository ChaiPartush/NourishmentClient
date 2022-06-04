import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { foods } from '../../../../../constants/Data/QuestionsToUser/ChooseProtains/cards';
import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CardChooseProtainsComponent } from './CardChooseProtainsComponent'
import { CardChooseFood } from '../CardChooseFood'

export const ChooseProtains = ({ items }) => {
    let currentItems = items
    const [favorite, setFavorite] = useState([])
    const RenderCardsProtains = () => {
        return (
            <FlatList
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
    return (
        <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: 'white', height: height * 0.83, marginTop: height * 0.02 }}>
            {/* <Animatable.View style={{ flexDirection: 'row', height: height * 0.14 }}>
                <CategoryListProtainsComponent />
            </Animatable.View> */}
            {RenderCardsProtains()}
        </Animatable.View >
    );
};



