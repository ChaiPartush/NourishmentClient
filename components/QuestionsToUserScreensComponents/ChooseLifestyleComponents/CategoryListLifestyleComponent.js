import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import { styles } from '../../../Styles/QuestionsToUserStyles/ChooseLifestyleStyle'
import { COLORS } from '../../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CategoryListLifestyleComponent = () => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const categoryItems = [
        { name: 'Chair', iconName: 'seat-outline' },
        { name: 'Table', iconName: 'table-furniture' },
        { name: 'Cupboard', iconName: 'cupboard-outline' },
        { name: 'bed', iconName: 'bed-queen-outline' },
    ];
    return (
        <View style={styles.categoriesContainer}>
            {categoryItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setSelectedCategoryIndex(index)}>
                    <View
                        style={[
                            styles.categoryItemBtn,
                            {
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary2
                                        : COLORS.light,
                            },
                        ]}>
                        <Icon
                            name={item.iconName}
                            size={20}
                            color={
                                selectedCategoryIndex == index ? COLORS.white : COLORS.primary2
                            }
                        />
                        <Text
                            style={[
                                styles.categoryText,
                                {
                                    color:
                                        selectedCategoryIndex == index
                                            ? COLORS.white
                                            : COLORS.primary2,
                                },
                            ]}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}