import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListCarbohydratesComponent } from './CategoryListCarbohydratesComponent'
import { CardChooseCarbohydratesComponent } from './CardChooseCarbohydratesComponent'
import { plants } from '../../../../../constants/Data/QuestionsToUser/ChooseFats/plants'
import { CardChooseFood } from '../CardChooseFood'
import { flatten } from 'mathjs'

export const ChooseCarbohydrates = ({ items }) => {
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

    return (
        <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: "white", height: height * 0.83, marginTop: height * 0.02 }}>
            {rederPopularSection()}
        </Animatable.View>
    )

}