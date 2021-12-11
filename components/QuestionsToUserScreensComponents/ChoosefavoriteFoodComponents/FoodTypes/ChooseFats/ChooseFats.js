import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable'
import plants from '../../../../../constants/Data/QuestionsToUser/ChooseFats/plants'
import { height } from '../../../../../constants/ScreenDimentionConst';
import { CategoryListFatsComponent } from './CategoryListFatsComponent'
import { CardChooseFatsComponent } from './CardChooseFatsComponent'

export const ChooseFats = ({ }) => {
  const renderFatsCard = () => {
    return (
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={plants}
        renderItem={({ item }) => {
          return <CardChooseFatsComponent plant={item} />;
        }}
      />
    )
  }
  return (
    <SafeAreaView style={{ flexDirection: 'column', top: height * 0.1, paddingHorizontal: 30 }}>

      <Animatable.View style={{ flexDirection: 'column', flex: 1, marginTop: 10 }}>
        <CategoryListFatsComponent />
      </Animatable.View>

      <Animatable.View style={{ flexDirection: 'column', height: height * 0.5 }}>
        {renderFatsCard()}
      </Animatable.View>

    </SafeAreaView>
  );
};



