import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseVitaminsStyle'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../../../constants/Colors';
import pets from '../../../../../constants/Data/QuestionsToUser/ChooseVitamins/pets'

export const CategoryListFatsComponent = ({ selectIndex, selectedCategoryIndex, filteredPets }) => {

    const petCategories = [
        { name: 'CATS', icon: 'cat' },
        { name: 'DOGS', icon: 'dog' },
        { name: 'BIRDS', icon: 'ladybug' },
        { name: 'BUNNIES', icon: 'rabbit' },
    ];
    const fliterPet = index => {
        const currentPets = pets.filter(
            item => item?.pet?.toUpperCase() == petCategories[index].name,
        )[0]?.pets;
        // setFilteredPets(currentPets);
        filteredPets(currentPets)
    };

    React.useEffect(() => {
        fliterPet(0);
    }, []);

    return (
        <Animatable.View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, }}>
            {petCategories.map((item, index) => (
                <View key={'pet' + index} style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            selectIndex(index)
                            fliterPet(index)
                        }}
                        style={[
                            styles.categoryBtn,
                            {
                                backgroundColor:
                                    selectedCategoryIndex == index
                                        ? COLORS.primary
                                        : COLORS.white,
                            },
                        ]}>
                        <Icon
                            name={item.icon}
                            size={30}
                            color={
                                selectedCategoryIndex == index
                                    ? COLORS.white
                                    : COLORS.primary
                            }
                        />
                    </TouchableOpacity>
                    <Text style={styles.categoryBtnName}>{item.name}</Text>
                </View>
            ))}
        </Animatable.View>
    )

}