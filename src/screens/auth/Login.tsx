import React, { useMemo } from 'react';
import { View, StyleSheet, Image, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

//file
import Button from '../../components/Buttons/Button';

const window = Dimensions.get('window')

const Login = () => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.screen}>
        <ImageBackground source={require('../../../assets/images/VFav_LoginPage.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.aboveScreenContainer}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../../assets/images/dating_pic2.jpg')}
                style={styles.imageUpperContainer} />
            </View>
          </View>
          {/* <Image source={require('../../../assets/images/cupid.png')} style={{ width: 200, height: 200, alignSelf: 'center', resizeMode: 'stretch', marginTop: 40 }} /> */}
          {/* <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>FIND YOUR LOVE</Text> */}
          <Button label={'Login'}
            color={['#4c669f', '#3b5998', '#192f6a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            ripple={false}
          />
          <Button
            label={'Sign Up'}
            color={['#4c669f', '#3b5998', '#192f6a']}
            ripple={true}
          />
          <Button label={'Sign'} />
          <Button color={['#4c669f', '#3b5998', '#192f6a']} ripple={true} />

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
    },
    aboveScreenContainer: {
      height: '30%',
    },
    imageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderBottomRightRadius: 200,
      borderBottomLeftRadius: 200,
      overflow: 'hidden',
      transform: [{ scaleX: 1.5 }],
    },
    imageUpperContainer: {
      width: '100%',
      height: '100%',
      transform: [{ scaleX: .67 }],
    },
  });

export default Login;
