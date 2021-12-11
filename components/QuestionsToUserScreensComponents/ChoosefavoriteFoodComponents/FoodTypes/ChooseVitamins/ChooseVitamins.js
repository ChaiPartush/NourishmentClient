import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseVitaminsStyle'

import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListFatsComponent } from './CategoryListVitaminsComponent'
import { CardChooseVitaminsComponent } from './CardChooseVitaminsComponent'

export const ChooseVitamins = () => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);

  const renderVitminsCards = () => {
    return (
      <Animatable.View
        style={{ marginTop: 20, height: height * 0.5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredPets}
          renderItem={({ item, index }) => (
            <CardChooseVitaminsComponent pet={item} />
          )}
        />
      </Animatable.View>
    )
  }

  return (
    <SafeAreaView style={{ flexDirection: 'column', height: '100%' }}>
      <View style={styles.mainContainer}>

        <CategoryListFatsComponent
          selectedCategoryIndex={selectedCategoryIndex}
          filteredPets={(value) => setFilteredPets(value)}
          selectIndex={(index) => setSeletedCategoryIndex(index)}
        />

        {renderVitminsCards()}

      </View>
    </SafeAreaView >
  );
};


