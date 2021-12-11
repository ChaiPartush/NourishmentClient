import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, TextInput, Button, Platform, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';

import * as Animatable from 'react-native-animatable';

import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { onSubmitRegisterForm } from './SignInAndSignUpConnectDBQueries'
import { styles } from '../../Styles/SignInAndSignUpStyle'

export const SignUp = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    })
  }

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    })
  }
  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={styles.footer}
    >
      <Text style={styles.text_footer}>Email</Text>
      <View style={styles.action}>
        <FontAwsome
          name="user-o"
          color="#05375a"
          size={20}
        />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
        />
        {data.check_textInputChange ?
          <Animatable.View
            animation="bounceIn"

          >

            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View>
          : null}
      </View>
      <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
      <View style={styles.action}>
        <Feather
          name="lock"
          color="#05375a"
          size={20}
        />
        <TextInput
          placeholder="Your password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}
        >
          {data.secureTextEntry ?
            <Feather
              name="eye-off"
              color="gray"
              size={20}
            />
            :
            <Feather
              name="eye"
              color="gray"
              size={20}
            />
          }
        </TouchableOpacity>
      </View>

      <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
      <View style={styles.action}>
        <Feather
          name="lock"
          color="#05375a"
          size={20}
        />
        <TextInput
          placeholder="Confirm Your password"
          secureTextEntry={data.confirm_secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handleConfirmPasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updateConfirmSecureTextEntry}
        >
          {data.secureTextEntry ?
            <Feather
              name="eye-off"
              color="gray"
              size={20}
            />
            :
            <Feather
              name="eye"
              color="gray"
              size={20}
            />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}

          onPress={() => {
            //  if (onSubmitRegisterForm(data.email, data.password) !== null) { navigation.navigate('ChooseTarget') }
            navigation.navigate('ChooseTarget')
          }}
        >
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}
