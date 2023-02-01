import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

//file
import CurveHeader from '../../components/CurveHeader/CurveHeader';
import BackButton from '../../components/Buttons/BackButton';
import Form from '../../components/Form/Form';

const window = Dimensions.get('window');

const Login = ({ navigation, route }: any) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.screenContainer}>
        <CurveHeader source={require('../../../assets/images/VFav_Header.png')} />
        <View style={styles.Container}>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 24, color: 'white' }}>
              Welcome to <Text style={{ fontWeight: 'bold' }}>VFav</Text>
            </Text>
            <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>
              Find your love in the world of many. Please sign in to your account as we care your privacy.
            </Text>
          </View>
          <Form sliderIndex={route.params.sliderIndex} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      minHeight: Math.round(window.height),
    },
    screenContainer: {
      flex: 1,
    },
    Container: {
      flex: 1,
      position: 'absolute',
      right: 0,
      left: 0,
      margin: '5%',
    },
  });

export default Login;
