import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Files
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Welcome'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Welcome'} component={Welcome} />
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
