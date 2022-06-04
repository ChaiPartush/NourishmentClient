import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from "react";
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, } from 'react-native-paper'
import { View } from 'react-native';
import MainTabScreen from '../MainPage/BottomTabs/MainTabScreen'
import SupportScreen from '../MainPage/BottomTabs/ProfileScreen/SupportScreen';
import SettingsScreen from '../MainPage/BottomTabs/ProfileScreen/SettingsScreen';
import BookmarksScreen from '../MainPage/BottomTabs/ProfileScreen/BookmarkScreen';
import DrawerContent from '../MainPage/BottomTabs/ProfileScreen/DrawerContent';
import { AuthContext } from '../../components/DefineOptionToPassInformainBetweenScreens'
import RootStackScreen from './RootStackScreen';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PiecesContext } from '../../components/Context/PiecesContext';

const Drawer = createDrawerNavigator();

export const MainControlScreen = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const [pieChartPieces, setPieChartPueces] = useState([{ x: 1, y: 25 },
    { x: 2, y: 25 },
    { x: 3, y: 25 },
    { x: 4, y: 25 }])
    const initialLoginState = {
        isLoading: false,
        userName: null,
        userToken: null,
    };

    const customDefualtTheme = {
        ...NavigationDefaultTheme, ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333'
        }
    }

    const customDarkTheme = {
        ...NavigationDarkTheme, ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff'
        }
    }

    const theme = isDarkTheme ? customDarkTheme : customDefualtTheme;

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };

        }
    };

    const arraysMatch = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    // const PieContext = () => ({
    //     changePieces: (arr) => {
    //         setPieChartPueces(arr);
    //         console.log(pieChartPieces)

    //     },

    //     getPieces: () => {
    //         return pieChartPieces;
    //     }

    // });

    // const PieContext = (newPiePieces, wantTogetCurrentPieces) => {
    //     if (newPiePieces !== null && arraysMatch(newPiePieces, pieChartPieces) === false) {
    //         setPieChartPueces(newPiePieces)
    //     }
    //     if (wantTogetCurrentPieces === true) {
    //         return pieChartPieces
    //     }

    // }

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            const userToken = String(foundUser[0].userToken);
            const userName = foundUser[0].userName;
            try {
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken })
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch (e) {
                console.log(e);
            }
            // setUserToken(null);
            // setIsLoading(false);
            dispatch({ type: 'LOGOUT' })

        },
        signUp: () => {
            // setUserToken('fgkj');
            // setIsLoading(false);
        },
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
        }, 1000);
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <PiecesContext.Provider value={[{ x: 1, y: 25 },
                { x: 2, y: 25 },
                { x: 3, y: 25 },
                { x: 4, y: 25 }]}>
                    <NavigationContainer theme={theme}>
                        {/* {loginState.userToken !== null ? ( */}
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
                            headerShown: false
                        }}>
                            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                            <Drawer.Screen name="BookmarksScreen" component={BookmarksScreen} />
                        </Drawer.Navigator>
                        {/* ) */}
                        {/* : */}
                        {/* <RootStackScreen /> */}
                        {/* } */}
                    </NavigationContainer>
                </PiecesContext.Provider>
            </AuthContext.Provider>
        </PaperProvider >
    );
}













