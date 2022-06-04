import React, { useState, useEffect, useContext } from 'react';
import { View, Text, BackHandler, TextInput, Button, Platform, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';

import * as Animatable from 'react-native-animatable';

import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../components/DefineOptionToPassInformainBetweenScreens'

import { onSubmitLoginForm } from './SignInAndSignUpConnectDBQueries'
import { styles } from '../../Styles/SignInAndSignUpStyle'



export const SignIn = ({ onpress }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });


  const { colors } = useTheme();
  const { signIn } = React.useContext(AuthContext);
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      })

    }
  }
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }
  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={[styles.footer, {
        backgroundColor: colors.background
      }]}
    >
      <Text style={[styles.text_footer, {
        color: colors.text
      }]}>Email</Text>
      <View style={styles.action}>
        <FontAwsome
          name="user-o"
          color={colors.text}
          size={20}
        />
        <TextInput
          placeholder="Your Email"
          placeholderTextColor="#666666"
          style={[styles.textInput, {
            color: colors.text
          }]}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}

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
      {data.isValidUser ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
        </Animatable.View>
      }


      <Text style={[styles.text_footer, {
        color: colors.text,
        marginTop: 35

      }]}>Password</Text>
      <View style={styles.action}>
        <Feather
          name="lock"
          color={colors.text}
          size={20}
        />
        <TextInput
          placeholder="Your password"
          placeholderTextColor="#666666"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[styles.textInput, {
            color: colors.text
          }]}
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
      {data.isValidPassword ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password must be 8 characters long</Text>
        </Animatable.View>
      }



      <TouchableOpacity onPress={() => onpress(false)}>
        <Text style={{ color: '#009387', marginTop: 15 }}>Dont Have User? Click here to create one</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}

          onPress={async () => {
            const foundUser = await onSubmitLoginForm(data.email, data.password)
            if (foundUser.length === 0) {
              Alert.alert('Invalid User!', 'Username or password is incorrect', [
                { text: 'Okay' }
              ]);
            }
            else {
              signIn(foundUser);
            }
          }
          }

        >
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, {
              color: '#fff'
            }]}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )

}

