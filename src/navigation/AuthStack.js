
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const RootStack = createStackNavigator();

const AuthStack = () => (
  <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name="LoginScreen" component={LoginScreen} />
    <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </RootStack.Navigator>
);

export default AuthStack;