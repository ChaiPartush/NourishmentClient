import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseFatsStyle'


export const CategoryListFatsComponent = () => {
    const [catergoryIndex, setCategoryIndex] = React.useState(0);
    const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];
    return (
        <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setCategoryIndex(index)}>
                    <Text
                        style={[
                            styles.categoryText,
                            catergoryIndex === index && styles.categoryTextSelected,
                        ]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

}