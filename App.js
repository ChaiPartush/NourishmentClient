import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font'
import {MainControlScreen} from './screens/ControlMovingBetweenScreens/MainControlScreen'
import { appLoading } from 'expo';
import AppLoading from 'expo-app-loading';

const getFonts = () => Font.loadAsync({
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
})

export default App = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <MainControlScreen />
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