import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen'
import { MenuScreen } from './MenuScreen'
import { StatusBar } from 'react-native'
import { DetailsScreen } from './DetailsScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import ExploreScreen from '../../MainPage/BottomTabs/ExploreScreen';
import { Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();


const MainTabScreen = ({ navigation, route }) => (
    <Tab.Navigator
        style={{ paddingTop: StatusBar.currentHeight }}
        initialRouteName="Home"
        activeColor="#fff"

    >

        <Tab.Screen
            name="Feed"
            component={MenuScreen}
            options={{ title: ({ color, focused }) => <Ionicons size={25} name={focused ? 'home' : 'home-outline'} color={focused ? 'blue' : '#272727'} /> }}
            initialParams={{
                chosenTarget: route.params.chosenTarget,
                chosenGender: route.params.chosenGender,
                chosenHeight: route.params.chosenHeight,
                chosenBirthday: route.params.chosenBirthday,
                chosenWeight: route.params.chosenWeight,
                chosenProducts: route.params.chosenProducts
            }}
        />
        <Tab.Screen
            name="Detail"
            component={DetailsScreen}
            options={{ title: ({ color, focused }) => <Ionicons size={25} name={focused ? 'people-sharp' : 'people-outline'} color={focused ? 'blue' : '#272727'} /> }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: ({ color, focused }) => <Ionicons size={25} name={focused ? 'search' : 'search-outline'} color={focused ? 'blue' : '#272727'} /> }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{ title: ({ color, focused }) => <Ionicons size={25} name={focused ? 'person' : 'person-outline'} color={focused ? 'blue' : '#272727'} /> }}
        // options={{
        //     tabBarLabel: 'Explore',
        //     tabBarColor: '#d02860',
        //     tabBarIcon: ({ color }) => (
        //         <Icon name="ios-aperture" color={color} size={26} />
        //     ),
        // }}
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