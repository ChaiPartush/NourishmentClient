import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, Animated } from 'react-native';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NextArrow } from '../../components/ArrowsComponents/NextArrow'
import hotels from '../../constants/Data/QuestionsToUser/ChooseProblem/hotels'
import { StatusBar } from 'expo-status-bar';
import { width, height } from '../../constants/ScreenDimentionConst'
import { CategoryListHealthProblemComponent } from '../../components/QuestionsToUserScreensComponents/ChooseHealthProblemComponent/CategoryListHealthProblemComponent';
import { CardChooseHealthProblemComponent } from '../../components/QuestionsToUserScreensComponents/ChooseHealthProblemComponent/CardChooseHealthProblemComponent'

export const ChooseProblem = ({ navigation }) => {
  const cardWidth = width / 1.8;
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const createBackArrowView = () => {
    return (
      <View style={{ backgroundColor: '#93B5C6' }}>
        <BackArrow handleBack={() => navigation.navigate('ChooseProblem')} />
      </View>
    )
  }
  const createNextArrowView = () => {
    return (
      <View style={{ marginTop: 40 }}>
        <NextArrow navigateToPageFunc={() => navigation.navigate('ChooseLifeStyle')} />
      </View>
    )
  }
  const HealthProblemsScrollList = () => {

    return (
      <View style={{ height: height * 0.53 }}>
        <Animated.FlatList
          onMomentumScrollEnd={(e) => {
            setActiveCardIndex(
              Math.round(e.nativeEvent.contentOffset.x / cardWidth),
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          horizontal
          data={hotels}
          contentContainerStyle={{
            paddingVertical: 30,
            paddingLeft: 20,
            paddingRight: cardWidth / 2 - 40,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <CardChooseHealthProblemComponent scrollX={scrollX} hotel={item} index={index} activeCardIndex={activeCardIndex} />}
          snapToInterval={cardWidth}
        />
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
  const RenderTitlePage = () => {
    return (
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginTop: 20 }}>What is your</Text>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>Health Problem?</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {createBackArrowView()}
      <StatusBar translucent={false} backgroundColor={'#93B5C6'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#93B5C6', height: 160, paddingHorizontal: 20 }}>
          <View>
            {RenderTitlePage()}
            {RenderSearchBar()}
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <CategoryListHealthProblemComponent selectedCategoryIndex={selectedCategoryIndex} currentCategoryIndex={(value) => setSelectedCategoryIndex(value)} />
        </View>
        {HealthProblemsScrollList()}
        {createNextArrowView()}
      </ScrollView>
    </SafeAreaView>
  );
};



