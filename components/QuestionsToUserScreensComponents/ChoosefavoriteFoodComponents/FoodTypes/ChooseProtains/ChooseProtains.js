import React from 'react';
import { View, FlatList } from 'react-native';
import { foods } from '../../../../../constants/Data/QuestionsToUser/ChooseProtains/cards';
import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListProtainsComponent } from './CategoryListProtainsComponent'
import { CardChooseProtainsComponent } from './CardChooseProtainsComponent'

export const ChooseProtains = () => {
    const RenderCardsProtains = () => {
        return (
            <View style={{ marginTop: -20, flexDirection: 'column', height: height * 0.5 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={foods}
                    renderItem={({ item }) => <CardChooseProtainsComponent food={item} />}
                />
            </View>
        )
    }
    return (
        <Animatable.View animation={'bounceInRight'} duration={1000} style={{ flexDirection: 'column', height: '100%' }}>
            <Animatable.View style={{ flexDirection: 'row', height: height * 0.14 }}>
                <CategoryListProtainsComponent />
            </Animatable.View>
            {RenderCardsProtains()}
        </Animatable.View >
    );
};



