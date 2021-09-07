import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { getAllUsers } from './constants/api';
import appStyles from './Styles/AppStyle';

export default function App(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userInfo = getUsersFromDB();
    Promise.resolve(userInfo).then(value => {
      setUsers(value)
    })
  })

  const getUsersFromDB = async () => {
    const userInfo = await getAllUsers();
    return userInfo;
  }

  return (
    <View style={appStyles.container} >
      <Text>Hello world</Text>
      {users.map((key, i) => {
        return <Text key={i}>{users[i]["name"]}</Text>
      })}
      <StatusBar style="auto" />
    </View>
  );
}


