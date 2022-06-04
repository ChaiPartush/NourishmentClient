import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerContent from './DrawerContent'
import { ChooseFats } from '../../../../components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseFats/ChooseFats'

const ProfileScreen = () => {
  return (
    <View>
      {/* <DrawerContent /> */}
      <ChooseFats />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});