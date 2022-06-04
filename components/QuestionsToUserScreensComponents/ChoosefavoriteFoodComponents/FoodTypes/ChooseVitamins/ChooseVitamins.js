import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { styles } from '../../../../../Styles/QuestionsToUserStyles/ChooseFavoriteFoodStyle/FoodTypesStyle/ChooseVitaminsStyle'

import * as Animatable from 'react-native-animatable'
import { height } from '../../../../../constants/ScreenDimentionConst'
import { CategoryListFatsComponent } from './CategoryListVitaminsComponent'
import { CardChooseVitaminsComponent } from './CardChooseVitaminsComponent'
import { CardChooseFood } from '../CardChooseFood'
import pets from '../../../../../constants/Data/QuestionsToUser/ChooseVitamins/pets'

export const ChooseVitamins = ({ items }) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  let currentItems = items

  const renderVitminsCards = () => {

    return (
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={currentItems}
        renderItem={({ item }) => (
          <CardChooseFood plant={item} />
        )}
      />
    )
  }

  return (
    // <SafeAreaView style={{ flexDirection: 'column', height: '100%' }}>
    <Animatable.View animation={'bounceInRight'} duration={1000} style={{ backgroundColor: 'white', height: height * 0.83, marginTop: height * 0.02 }}>

      {/* <CategoryListFatsComponent
          selectedCategoryIndex={selectedCategoryIndex}
          filteredPets={(value) => setFilteredPets(value)}
          selectIndex={(index) => setSeletedCategoryIndex(index)}
        />  */}

      {renderVitminsCards()}

    </Animatable.View>
    // </SafeAreaView >
  );
};


