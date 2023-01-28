import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Files
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
