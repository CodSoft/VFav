import React, { useMemo } from 'react';
import { View, StyleSheet, Image, ImageBackground, Dimensions, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

//file
import Button from '../../components/Buttons/Button';
import CurveHeader from '../../components/CurveHeader/CurveHeader';

const window = Dimensions.get('window');

const Welcome = ({ navigation }: any) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <ImageBackground source={require('../../../assets/images/VFav_LoginPage.png')} style={{ width: '100%', height: '100%' }}>
          <CurveHeader source={require('../../../assets/images/dating_pic2.jpg')} />
          <Image source={require('../../../assets/images/cupid.png')} style={styles.image} />
          <Text style={styles.text}>use me or die single !</Text>
          <View style={{ marginTop: 30 }}>
            <Button
              label={'Log In'}
              color={'white'}
              labelStyle={{
                fontSize: 20,
                color: 'rgba(255,87,87,1)',
                fontWeight: 'bold',
              }}
              onPress={() => {
                navigation.navigate('Login', { sliderIndex: 0 });
              }}
            />
            <Button
              label={'Sign Up'}
              color={['#FF914D', '#ff5757']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              labelStyle={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
              containerStyle={{ borderColor: 'white', borderWidth: 1 }}
              onPress={() => {
                navigation.navigate('Login', { sliderIndex: 1 });
              }}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    text: {
      marginVertical: 10,
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: 'white',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    image: {
      width: '40%',
      height: '25%',
      alignSelf: 'center',
      resizeMode: 'stretch',
      marginTop: 40,
    },
  });

export default Welcome;
