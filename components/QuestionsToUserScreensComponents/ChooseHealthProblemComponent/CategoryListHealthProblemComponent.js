import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseProblemStyle'
import { COLORS } from '../../../constants/Colors'

export const CategoryListHealthProblemComponent = ({ currentCategoryIndex, selectedCategoryIndex }) => {
    const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];

    return (
        <View style={styles.categoryListContainer}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}

                    onPress={() => currentCategoryIndex(index)}>
                    <View>
                        <Text
                            style={{
                                ...styles.categoryListText,
                                color:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary
                                        : COLORS.grey,
                            }}>
                            {item}
                        </Text>
                        {selectedCategoryIndex == index && (
                            <View
                                style={{
                                    height: 3,
                                    width: 30,
                                    backgroundColor: COLORS.primary,
                                    marginTop: 2,
                                }}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )

}