import React from 'react'
import { View, ScrollView, TouchableOpacity,Image,Text } from 'react-native'
import {categories} from '../../../../../constants/Data/QuestionsToUser/ChooseProtains/categories'
import {COLORS} from '../../../../../constants/Colors';
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseProtainsStyle'

export const CategoryListProtainsComponent = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesListContainer}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setSelectedCategoryIndex(index)}>
                    <View
                        style={{
                            backgroundColor:
                                selectedCategoryIndex == index
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            ...styles.categoryBtn,
                        }}>
                        <View style={styles.categoryBtnImgCon}>
                            <Image
                                source={category.image}
                                style={{ height: 35, width: 35, resizeMode: 'cover' }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginLeft: 10,
                                color:
                                    selectedCategoryIndex == index
                                        ? COLORS.white
                                        : COLORS.primary,
                            }}>
                            {category.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

}