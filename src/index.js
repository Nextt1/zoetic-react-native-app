import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import { Provider as PaperProvider} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { HomeScreen, VitalScreen, VitalAddScreen, DoctorScreen } from './screens';
import { getScreenOptions, PRIMARY_COLOR, theme } from './utilities';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(){

	const navigationRef = React.useRef();

	useEffect(() => {
	}, []);

	function HomeStack() {
		return (
			<Stack.Navigator
				screenOptions={getScreenOptions(TransitionPresets)}
				headerMode="none"
				animation="fade"
			>
				<Stack.Screen name="home" component={HomeScreen} />
			</Stack.Navigator>
		);
	}

    function VitalStack() {
		return (
			<Stack.Navigator
				screenOptions={getScreenOptions(TransitionPresets)}
				headerMode="none"
				animation="fade"
			>
				<Stack.Screen name="vitals" component={VitalScreen} />
				<Stack.Screen name="addVital" component={VitalAddScreen} />
			</Stack.Navigator>
		);
	}

    function DoctorStack() {
		return (
			<Stack.Navigator
				screenOptions={getScreenOptions(TransitionPresets)}
				headerMode="none"
				animation="fade"
			>
				<Stack.Screen name="addVital" component={DoctorScreen} />
			</Stack.Navigator>
		);
	}
	
	const FanNavigator = () => {
		return (
			<Tab.Navigator
				initialRouteName="vitals"
				tabBarOptions={{
					activeTintColor: PRIMARY_COLOR,
				}}
			>
				<Tab.Screen 
					options={({route}) => ({
						tabBarLabel: 'Home',
						tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesomeIcon name="home" color={color} size={focused ? 30 : 25} />
						),
						tabBarVisible: true
					})}
					name="home" component={HomeStack}
				/>
				<Tab.Screen 
					options={({route}) => ({
						tabBarLabel: 'Vitals',
						tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesomeIcon name="file-medical-alt" color={color} size={focused ? 30 : 25} />
						),
						tabBarVisible: true
					})}
					name="vital" component={VitalStack}
				/>
				<Tab.Screen 
					options={({route}) => ({
						tabBarLabel: 'Doctors',
						tabBarIcon: ({ focused, color, size }) => (
							<FontAwesomeIcon name="user-nurse" color={color} size={focused ? 30 : 25} />
						),
						tabBarVisible: true
					})}
					name="doctor" component={DoctorStack}
				/>
		
			</Tab.Navigator>
		)
	}

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator
                        screenOptions={getScreenOptions(TransitionPresets)}
                        initialRouteName="main" 
                        headerMode="none"
                        animation="fade"
                    >
                        <Stack.Screen name="main" component={FanNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    )
};