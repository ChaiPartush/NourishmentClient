import React from 'react';
import SplashScreen from '../WelcomeScreens/SplashScreen';
import { SignInAndSignUpScreen } from '../WelcomeScreens/SignInAndSignUpScreen'
import { ChooseTarget } from '../QuestionsToUser/ChooseTarget'
import { Easing } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ChooseProblem } from '../QuestionsToUser/ChooseProblem'
import { ChooseLifeStyle } from '../QuestionsToUser/ChooseLifeStyle'
import { ChoosefavoriteFood } from '../QuestionsToUser/ChoosefavoriteFood'
import { BMICalculator } from '../QuestionsToUser/BMICalculator'
import { DetailsChooseProblem } from '../../components/QuestionsToUserScreensComponents/ChooseHealthProblemComponent/DetailsChooseProblem'
import { DescriptionScreen } from '../../components/QuestionsToUserScreensComponents/ChooseLifestyleComponents/DescriptionScreen';
import MainTabScreen from '../MainPage/BottomTabs/MainTabScreen'
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator();

const config = {
    Animation: 'spring',
    config: {
        duration: 800,
        stifness: 1000,
        damping: 200,
        mass: 7,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSoeedThreshold: 0.01
    }
}

const closeConfig = {
    Animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    }
}

const transition = ({ transitionType }) => {
    return (
        {
            transitionSpec: {
                open: config,
                close: closeConfig,
            },
            cardStyleInterpolator: transitionType,
        }
    )
}

export const RootStackScreen = ({ navigation }) => (
    <NavigationContainer >
        <RootStack.Navigator screenOptions={{
            headerShown: false,
        }}>

            {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
            {/* <RootStack.Screen name="SignInAndSignUpScreen" component={SignInAndSignUpScreen} /> */}
            <RootStack.Screen name="ChooseTarget" component={ChooseTarget} />
            <RootStack.Screen name="BMICalculator" component={BMICalculator} options={
                {
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                }
            } />
            {/* <RootStack.Screen name="ChooseProblem" component={ChooseProblem} options={
                {
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} />
            <RootStack.Screen name="ChooseLifeStyle" component={ChooseLifeStyle} options={
                {
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                }} /> */}
            <RootStack.Screen name="ChoosefavoriteFood" component={ChoosefavoriteFood}
                options={
                    {
                        transitionSpec: {
                            open: config,
                            close: closeConfig,
                        },
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }
                }
            />
            <RootStack.Screen name="DetailsChooseProblem" component={DetailsChooseProblem} options={transition(CardStyleInterpolators.forModalPresentationIOS)} />
            <RootStack.Screen name="DescriptionScreen" component={DescriptionScreen} />

            <RootStack.Screen name="MainTabScreen" component={MainTabScreen}
                options={
                    {
                        transitionSpec: {
                            open: config,
                            close: closeConfig,
                        },
                        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                    }} />
        </RootStack.Navigator>
    </NavigationContainer >
);

