import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

// Files
import {persistor, store} from './src/redux/Store';
import {NavigationRef} from './src/routers/RouterServices';
import MainStack from './src/routers/MainStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={NavigationRef}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar style="auto" />
          <MainStack />
        </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}