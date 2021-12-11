import React from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, Image, ScrollView } from 'react-native';
import { COLORS } from '../../constants/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import furnitures from '../../constants/Data/QuestionsToUser/ChooseLifestyle/furnitures'
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
import { StatusBar } from 'expo-status-bar';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow';
import { CategoryListLifestyleComponent } from '../../components/QuestionsToUserScreensComponents/ChooseLifestyleComponents/CategoryListLifestyleComponent'
import { CardChooseLifestyleComponent } from '../../components/QuestionsToUserScreensComponents/ChooseLifestyleComponents/CardChooseLifestyleComponent'
import { BottomCardChooseLifestyleComponent } from '../../components/QuestionsToUserScreensComponents/ChooseLifestyleComponents/BottomCardChooseLifestyleComponent'

export const ChooseLifeStyle = ({ navigation }) => {
  const RenderLifeStylesCards = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, marginTop: 5 }}
        data={furnitures}
        horizontal
        renderItem={({ item }) => <CardChooseLifestyleComponent furniture={item} />}
      />
    )
  }
  const RenderBottomCardsList = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        data={furnitures}
        renderItem={({ item }) => <BottomCardChooseLifestyleComponent furniture={item} />}
      />
    )
  }
  const createBackArrowView = () => {
    return (
      <View style={{ backgroundColor: '#E4D8DC' }}>
        <BackArrow handleBack={() => navigation.navigate('BMIInfo')} />
      </View>
    )
  }
  const createNextArrowView = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <NextArrow navigateToPageFunc={() => navigation.navigate('ChoosefavoriteFood')} />
      </View>
    )
  }
  const RenderSearchBar = () => {
    return (
      <View style={{ height: 60, width: '100%', backgroundColor: 'white', borderRadius: 10, position: 'absolute', top: 125, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', elevation: 12 }}>
        <MaterialIcons name='search' size={28} />
        <TextInput placeholder="Search place" />
      </View>

    )
  }
  const RenderTitle = () => {
    return (
      <View>
        <Text style={{ color: '#630000', fontWeight: 'bold', fontSize: 23, marginTop: 30 }}>What is your</Text>
        <Text style={{ color: '#630000', fontWeight: 'bold', fontSize: 23 }}>lifestyle eating?</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {createBackArrowView()}
      <StatusBar translucent={false} backgroundColor={'#E4D8DC'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#E4D8DC', height: 160, paddingHorizontal: 20 }}>
          <View>
            {RenderTitle()}
            {RenderSearchBar()}
          </View>
        </View>
        <CategoryListLifestyleComponent />
        {RenderLifeStylesCards()}
      </ScrollView>
      {createNextArrowView()}
    </SafeAreaView>
  );
};

