import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { menu } from '../../../../../constants/Data/QuestionsToUser/ChooseCarbohydrates/Cards'
import { categories } from '../../../../../constants/Data/QuestionsToUser/ChooseCarbohydrates/categories'
import { COLORS } from '../../../../../constants/Colors'
import { SIZES } from '../../../../../constants/Sizes'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseCarbohydratesStyle'

export const CategoryListCarbohydratesComponent = ({ setPopular, setMenuList, selectedMenuType }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1)
    const handleChangeCategory = (categoryId, menuTypeId) => {
        let selectedPopular = menu.find(a => a.name == "Popular")
        let selectedMenu = menu.find(a => a.id == menuTypeId)
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)

    }, [])
    return (

        <FlatList
            data={categories}
            keyExtractor={item => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={[styles.categoriesButton, {
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == categories.length - 1 ? SIZES.padding : 0,
                        paddingHorizontal: 8,
                        borderRadius: SIZES.radius,
                        backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2,
                    }]}
                    onPress={() => {
                        setSelectedCategoryId(item.id)
                        handleChangeCategory(item.id, selectedMenuType)
                    }}
                >
                    <Image source={item.icon} style={styles.categoriesImage} />

                    <Text style={[styles.categoriesName,
                    { color: selectedCategoryId == item.id ? 'white' : 'black' }]}
                    >{item.name}</Text>
                </TouchableOpacity>
            )}

        />
    )

}