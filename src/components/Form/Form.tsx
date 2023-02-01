import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text, Animated, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

//file
import NeuView from '../Neumorphism/NeuView';
import TextInput from '../TextInput/TextInput';
import Button from '../Buttons/Button';
import Checkbox from 'expo-checkbox';

interface FormProps {
  style?: StyleProp<ViewStyle>;
  sliderIndex?: number;
}

const Form: React.FC<FormProps> = ({ style, sliderIndex }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const sliderValue = sliderIndex || 0;

  let [active, setActive] = React.useState(sliderValue);
  let [xTabLogin, setXLogin] = React.useState(0);
  let [xTabSignUp, setXSignUp] = React.useState(0);
  let [translateX, setTranslateX] = React.useState(new Animated.Value(0));

  // console.log('translateX: ', translateX);
  // console.log('xTabLogin: ', xTabLogin);
  // console.log('xTabSignUp: ', xTabSignUp);

  function handleSlide(type: number) {
    Animated.timing(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }

  React.useEffect(() => {
    sliderValue ? setTranslateX(new Animated.Value(xTabSignUp)) : null;
  }, [xTabSignUp]);

  return (
    <View style={style}>
      <NeuView radius={10}>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.tabIndicator, { width: active ? '50%' : '40%', transform: [{ translateX }] }]} />
          <TouchableOpacity
            onLayout={(event) => setXLogin(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(0), handleSlide(xTabLogin);
            }}
          >
            <Text style={styles.sliderLabel}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLayout={(event) => setXSignUp(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(1), handleSlide(xTabSignUp);
            }}
          >
            <Text style={styles.sliderLabel}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {active ? <TextInput label="username" containerStyle={styles.inputText} iconName={'account-circle-outline'} /> : null}
        <TextInput label="email" containerStyle={styles.inputText} iconName={'email-outline'} keyboardType={'email-address'} />
        <TextInput label="password" containerStyle={[styles.inputText, { marginBottom: !active ? 10 : 20 }]} iconName={'lock'} />
        {!active ? (
          <View style={styles.externalfield}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox color={'#FF914D'} value={true} />
              <Text style={[styles.text, { color: 'rgb(150, 150, 150)' }]}> Keep me Log in</Text>
            </View>
            <Text style={[styles.text, , { color: '#ff5757' }]}>Forgot Password?</Text>
          </View>
        ) : null}
        <Button
          label={active ? 'Sign Up' : 'Log In'}
          color={['#FF914D', '#ff5757']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          labelStyle={styles.buttonLabel}
          containerStyle={[
            styles.buttonContainer,
            {
              marginBottom: active ? 10 : 40,
            },
          ]}
          onPress={() => console.log('pressed')}
        />
        {active ? (
          <Text style={[styles.text, { alignSelf: 'center', marginBottom: 40, color: 'rgb(150, 150, 150)' }]}>
            We don't spam we'll take care of your <Text style={{ color: '#ff5757' }}>Privacy</Text>
          </Text>
        ) : null}
      </NeuView>
    </View>
  );
};
const createStyles = (theme: any) =>
  StyleSheet.create({
    inputText: {
      width: '80%',
      marginTop: 20,
    },
    tabContainer: {
      marginTop: 20,
      marginBottom: 10,
      position: 'relative',
      flexDirection: 'row',
      marginLeft: '10%',
      justifyContent: 'space-between',
      width: '38%',
      // backgroundColor: 'blue',
    },
    tabIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: '120%',
      borderBottomColor: '#FF914D',
      borderBottomWidth: 2,
    },
    externalfield: {
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 20,
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    buttonLabel: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    sliderLabel: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '80%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Form;
