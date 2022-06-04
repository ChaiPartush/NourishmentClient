import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import * as Font from 'expo-font'
import { MainControlScreen } from './screens/ControlMovingBetweenScreens/MainControlScreen'
import { ChooseTarget } from './screens/QuestionsToUser/ChooseTarget';
import { appLoading } from 'expo';
import AppLoading from 'expo-app-loading';
import { RootStackScreen } from './screens/ControlMovingBetweenScreens/RootStackScreen';
import { ChooseFats } from './components/QuestionsToUserScreensComponents/ChoosefavoriteFoodComponents/FoodTypes/ChooseFats/ChooseFats';
import { ChoosefavoriteFood } from './screens/QuestionsToUser/ChoosefavoriteFood';
import { MenuScreen } from './screens/MainPage/BottomTabs/MenuScreen';
import { ref, set } from "firebase/database"
import firebase from "firebase";
import { db } from './config';
import { doc, getDoc } from "firebase/firestore";
import { snapPoint } from 'react-native-redash';
const getFonts = () => Font.loadAsync({
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
})

export default App = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [useName, setName] = useState('')
  const [email, setEmail] = useState('')





  const create = () => {
    // add data
    // const docRef = db.collection('Animals').doc('3');
    // await docRef.set({
    //   Name: 'Chai',
    //   damage: '170',
    // })

    //get 
    // const citiesRef = db.collection('Animals');
    // citiesRef.where("Name", "==", "Dog").onSnapshot((querySnapShot) =>
    //   querySnapShot.forEach((doc) => {
    //     console.log(JSON.stringify(doc.data()))
    //   }))


    //update
    // var johnRef = firebase.database().ref("users/ghg");
    // johnRef.update({
    //   "number": 10
    // })



  }


  if (fontsLoaded) {
    return (
      // <View style={styles.container}>
      //   <Text>Firebase</Text>

      //   <TextInput
      //     value={useName}
      //     onChangeText={(userName) => { setName(userName) }}
      //     placeholder='UserName' style={styles.textBoxes}>
      //   </TextInput>

      //   <TextInput
      //     value={email}
      //     onChangeText={(email) => { setEmail(email) }}
      //     placeholder='Email' style={styles.textBoxes}>
      //   </TextInput>

      //   <Button title='submit data' onPress={create}></Button>
      // </View>

      // <RootStackScreen />
      <MenuScreen />
      // <ChoosefavoriteFood />

    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10
  }
});