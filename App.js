import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

import CalculatorPage from './calculator/CalculatorPage';

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2d35',
      }}
    >
      <Text style={{ color: 'white' }}>Settings!</Text>
    </View>
  );
};

const RollsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2d35',
      }}
    >
      <Text style={{ color: 'white' }}>Rolls!</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Neucha: require('./assets/fonts/Neucha-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Calculator') {
                iconName = focused ? 'calculator' : 'calculator-outline';
              } else if (route.name === 'Rolls') {
                iconName = focused ? 'md-star' : 'md-star-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#fff',
            tabBarActiveBackgroundColor: '#2a2d35',
            tabBarInactiveTintColor: '#fff',
            tabBarInactiveBackgroundColor: '#212326',
            tabBarShowLabel: false,
            tabBarItemStyle: {
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
              backgroundColor: '#212326',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name='Calculator' component={CalculatorPage} />
          <Tab.Screen name='Rolls' component={RollsScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
