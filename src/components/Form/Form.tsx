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
}
const Form: React.FC<FormProps> = ({ style }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  let [active, setActive] = React.useState(0);
  let [xTabLogin, setXLogin] = React.useState(0);
  let [xTabSignUp, setXSignUp] = React.useState(0);
  let [translateX, setTranslateX] = React.useState(new Animated.Value(0));

  function handleSlide(type: number) {
    Animated.timing(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={style}>
      <NeuView radius={10}>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            position: 'relative',
            flexDirection: 'row',
            marginLeft: '10%',
            justifyContent: 'space-between',
            width: '38%',
            // backgroundColor: 'blue',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '120%',
              borderBottomColor: '#FF914D',
              borderBottomWidth: 2,
              width: active ? '50%' : '40%',
              transform: [{ translateX }],
            }}
          />
          <TouchableOpacity
            onLayout={(event) => setXLogin(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(0), handleSlide(xTabLogin);
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLayout={(event) => setXSignUp(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(1), handleSlide(xTabSignUp);
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {active ? <TextInput label="username" containerStyle={styles.inputText} iconName={'account-circle-outline'} /> : null}
        <TextInput label="email" containerStyle={styles.inputText} iconName={'email-outline'} keyboardType={'email-address'} />
        <TextInput label="password" containerStyle={[styles.inputText, { marginBottom: !active ? 10 : 20 }]} iconName={'lock'} />
        {!active ? (
          <View style={{ width: '80%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox color={'#FF914D'} value={true} />
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'rgb(150, 150, 150)' }}> Keep me Log in</Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff5757' }}>Forgot Password?</Text>
          </View>
        ) : null}
        <Button
          label={active ? 'Sign Up' : 'Log In'}
          color={['#FF914D', '#ff5757']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          labelStyle={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
          containerStyle={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: active ? 10 : 40,
          }}
          onPress={() => console.log('pressed')}
        />
        {active ? (
          <Text style={{ fontSize: 12, fontWeight: 'bold', alignSelf: 'center', marginBottom: 40, color: 'rgb(150, 150, 150)' }}>
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
  });

export default Form;