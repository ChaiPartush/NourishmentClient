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
import { AddItem, UpdateItemFields, DeleteItem, UpdateDocName } from './functionsToControlDB';
import { FoodTypes } from './constants/Logics/FoodTypes';
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
  const [start, setStart] = useState(false)
  const [startDelete, setStartDelete] = useState(false)
  const [startChangeDocName, setStartChangeDocName] = useState(false)


  if (start === true) {
    AddItem(

      // food type name 
      FoodTypes.protains,

      // name of product 
      'cottage cheese tnuva 5% fat',

      // properties object
      {
        id: 10, // number increase
        caloriesFor100Grams: 95,  // number-kcal - kilo caories
        carbohydratesFor100Grams: 1.5,  // number-grams 
        fatsFor100Grams: 5, // number-grams
        name: 'cottage cheese tnuva 5% fat', // string - english name of product 
        protainsFor100Grams: 11, //numer- grams
        type: FoodTypes.protains, //  string -foodtype
        englishMeasuringToolsObjectAndGramsForOneMeasure: [], // array of measurings and gram for one from it  
        hebrewMeasuringToolsObjectAndGramsForOneMeasure: [], // // array of measurings and gram for one from it  
        hebrewName: 'גבינת קוטג 5% של תנובה', //string
        sourceOfInformation: 'https://www.foodsdictionary.co.il/Products/5/%D7%A7%D7%95%D7%98%D7%92%2560%20%D7%AA%D7%A0%D7%95%D7%91%D7%94%205%25', //  url of product 
        englishCategory: '',
        hebrewCategory: '',
        image:   // string - base 64 of image
          '',
      })
  }

  if (startDelete === true) {
    DeleteItem(FoodTypes.protains, 'peanuts')
  }

  if (startChangeDocName === true) {
    UpdateDocName(FoodTypes.protains, "chicken fillet cooked", "chickenFilletCooked")
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

      <RootStackScreen />
      // <MenuScreen />
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