import React, { useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  View,
  TextInput,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExtraInputProps {
  label?: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconColor?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
}

type InputProps = ExtraInputProps & TextInputProps;

const StyledTextInput: React.FC<InputProps> = ({
  label,
  iconName,
  iconColor,
  placeholder,
  keyboardType,
}) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const labelValue = label ? label : 'Label';
  const iconNameValue = iconColor ? iconColor : 'rgba(255,87,87,1)';
  const placeholderValue = placeholder ? placeholder : 'placeholder';
  const keyboardTypeValue = keyboardType ? keyboardType : 'default';

  const [value, onChangeValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{labelValue}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={value}
          placeholder="your@email.com"
          keyboardType="email-address"
        />
        <View style={styles.rightIcon}>
          <MaterialCommunityIcons
            name={iconName}
            size={32}
            color={iconNameValue}
          />
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
      borderRadius: 5,
    },
    inputLabel: {
      textTransform: 'uppercase',
      marginBottom: 5,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
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
      borderRadius: 5,
      paddingLeft: 15,
      paddingRight: '20%',
    },
  });
