import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen'
import { DetailsScreen } from './DetailsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import ExploreScreen from '../../MainPage/BottomTabs/ExploreScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"

    >
        <Tab.Screen
            name="Feed"
            component={HomeScreen}

            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Detail"
            component={DetailsScreen}
            options={{
                tabBarLabel: 'Details',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarColor: '#d02860',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>

);
export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headershown: false
        // headerStyle: {
        //     backgroundColor: '#009387'
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //     fontWeight: 'bold'
        // }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen}
            screenOptions={{ headershown: false }}
        // options={{

        //     headerLeft: () => (
        //         <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() =>
        //             navigation.openDrawer()
        //         }></Icon.Button>)
        // }}
        />
        <HomeStack.Screen name="DetailsScreen" component={DetailsScreen} screenOptions={{ headershown: false }} />
    </HomeStack.Navigator>

);

const DetailsStackScreen = ({ navigation }) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#1f65ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() =>
                        navigation.openDrawer()
                    }></Icon.Button>)
            }} />
    </DetailsStack.Navigator>

);