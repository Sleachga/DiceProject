import React, { useState } from 'react';

import toastConfig from './Toast';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Toast from 'react-native-toast-message';

import CalculatorPage from './calculator/CalculatorPage';

import SettingsScreen from './screens/SettingsScreen';
import DiceScreen from './screens/DiceScreen';
import RollsScreen from './screens/RollsScreen';
import SocialScreen from './screens/SocialScreen';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const Tab = createBottomTabNavigator();

export default function App() {
  const [rollHistory, setRollHistory] = useState([]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

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
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Social') {
                iconName = focused ? 'people-circle' : 'people-circle-outline';
              } else if (route.name === 'Dice') {
                iconName = focused ? 'dice-d20' : 'dice-d20-outline';
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color='white'
                  />
                );
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
          <Tab.Screen name='Calculator'>
            {() => (
              <CalculatorPage
                rollHistory={rollHistory}
                setRollHistory={setRollHistory}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name='Dice'>
            {() => (
              <DiceScreen
                rollHistory={rollHistory}
                setRollHistory={setRollHistory}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name='Rolls' component={RollsScreen} />
          <Tab.Screen name='Social'>
            {() => <SocialScreen db={db} />}
          </Tab.Screen>
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
