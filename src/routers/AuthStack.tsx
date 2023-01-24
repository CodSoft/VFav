import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Files
import RouterConstants from './RouterConstants';
import Welcome from '../screens/auth/Welcome';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouterConstants.Welcome}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouterConstants.Welcome} component={Welcome} />
    </Stack.Navigator>
  );
};

export default AuthStack;
