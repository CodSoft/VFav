import React, { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextInputProps, View, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExtraInputProps {
  label?: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconColor?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  containerStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
}

type InputProps = ExtraInputProps & TextInputProps;

const StyledTextInput: React.FC<InputProps> = ({ label, iconName, iconColor, placeholder, keyboardType, containerStyle, iconSize }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelValue = label ? label : 'Label';
  const iconNameValue = iconColor ? iconColor : 'rgba(255,87,87,1)';
  const placeholderValue = placeholder ? placeholder : 'placeholder';
  const keyboardTypeValue = keyboardType ? keyboardType : 'default';
  const iconSizeValue = iconSize ? iconSize : 24;

  const _defaultPlaceholderValue = () => {
    switch (labelValue.toLocaleLowerCase()) {
      case 'email' || 'e-mail':
        return 'your@email.com';
      case 'password':
        return '∗ ∗ ∗ ∗ ∗ ∗ ∗ ∗';
      case 'username':
        return 'username@123';
      default:
        return 'placeholder';
    }
  };
  const defaultPlaceholderValue = _defaultPlaceholderValue();

  const [value, onChangeValue] = useState('');

  // console.log(labelValue.toLocaleLowerCase() === 'password' ? true : false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.inputLabel}>{labelValue}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={value}
          placeholder={defaultPlaceholderValue}
          keyboardType={keyboardTypeValue}
          secureTextEntry={labelValue.toLocaleLowerCase() === 'password' ? true : false}
        />
        <View style={styles.rightIcon}>
          <MaterialCommunityIcons name={iconName} size={iconSizeValue} color={iconNameValue} />
        </View>
      </View>
    </View>
  );
};

export default StyledTextInput;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '70%',
      alignSelf: 'center',
    },
    inputContainer: {
      // width: '70%',
      height: 50,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    inputLabel: {
      textTransform: 'uppercase',
      marginBottom: 5,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
    },
    rightIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
    },

    input: {
      height: '100%',
      width: '100%',
      borderWidth: 2,
      borderColor: 'rgb(211, 211, 211)',
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: '20%',
    },
  });
