import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, TextInput, ImageBackground, Button, Text, StyleSheet } from 'react-native'
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
import { width } from './constants/ScreenDimentionConst';
const getFonts = () => Font.loadAsync({
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  'VarelaRound-Regular': require('./assets/fonts/VarelaRound-Regular.ttf'),
  'Fredoka-Regular': require('./assets/fonts/Fredoka-Regular.ttf')

})

export default App = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [useName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [start, setStart] = useState(true)
  const [startDelete, setStartDelete] = useState(false)
  const [startChangeDocName, setStartChangeDocName] = useState(false)


  if (start === true) {
    AddItem(

      // food type name 
      FoodTypes.carbohydrates,

      // name of product 
      'oats',

      // properties object
      {
        id: 3, // number increase
        caloriesFor100Grams: 389,  // number-kcal - kilo caories
        carbohydratesFor100Grams: 66.3,  // number-grams 
        fatsFor100Grams: 6.9, // number-grams
        name: 'oats', // string - english name of product 
        protainsFor100Grams: 16.9, //numer- grams
        type: FoodTypes.carbohydrates, //  string -foodtype
        englishMeasuringToolsObjectAndGramsForOneMeasure: [], // array of measurings and gram for one from it  
        hebrewMeasuringToolsObjectAndGramsForOneMeasure: [], // // array of measurings and gram for one from it  
        hebrewName: 'שיבולת שועל', //string
        sourceOfInformation: 'https://fdc.nal.usda.gov/fdc-app.html#/food-details/169705/nutrients', //  url of product 
        englishCategory: '',
        hebrewCategory: '',
        image:   // string - base 64 of image
          '',
      })
  }

  if (startDelete === true) {
    DeleteItem(FoodTypes.protains, 'oats')
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
      // <ImageBackground source={require('./assets/shapesBackground.jpg')} resizeMode={"cover"} style={{ width: width }}>
        <RootStackScreen />
      // </ImageBackground>
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