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

const Tab = createBottomTabNavigator();

export default function App() {
  const [rollHistory, setRollHistory] = useState([]);

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
          <Tab.Screen
            name='Calculator'
            component={() => (
              <CalculatorPage
                rollHistory={rollHistory}
                setRollHistory={setRollHistory}
              />
            )}
          />
          <Tab.Screen
            name='Dice'
            component={() => (
              <DiceScreen
                rollHistory={rollHistory}
                setRollHistory={setRollHistory}
              />
            )}
          />
          <Tab.Screen name='Rolls' component={RollsScreen} />
          <Tab.Screen name='Social' component={SocialScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
