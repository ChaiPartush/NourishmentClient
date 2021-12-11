import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerContent from './DrawerContent'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <DrawerContent />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});