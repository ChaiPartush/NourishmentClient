import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, StatusBar } from 'react-native';
import { BackArrow } from '../../components/ArrowsComponents/BackArrow'
import { SignIn } from '../../components/SignInAndSignUp/SignIn'
import { SignUp } from '../../components/SignInAndSignUp/SignUp'
import { styles } from '../../Styles/SignInAndSignUpStyle'



export const SignInAndSignUpScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true)

  const disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', disableBackButton)
  }, [])

  return (
    <View style={styles.container}>
      {
        isLogin === false ? <BackArrow handleBack={() => setIsLogin(true)} /> : <View></View>
      }
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      {

        isLogin ? <SignIn onpress={(value) => setIsLogin(value)} /> : <SignUp navigation={navigation} />
      }
    </View >
  );
};

