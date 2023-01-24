import React, { useMemo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Text, View, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

//file
import CircleRipple from '../Ripple/CircleRipple';

interface ButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  label?: string;
  color?: string[] | string;
  start?: { x: number, y: number };
  end?: { x: number, y: number };
  ripple?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ containerStyle, children, label, color, start, end, ripple, labelStyle, onPress = () => null }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  let labelValue = label ? label : 'Button';
  let rippleValue = ripple ? ripple : false;
  let colorValue = color ? color : 'blue';
  let labelStyleValue = labelStyle ? labelStyle : { fontSize: 20, color: 'white', fontWeight: 'bold' };

  const RippleBox = () => {
    return (
      <CircleRipple
        style={styles.ripple}
        onTap={onPress}>
        <Text style={labelStyleValue as {}}>{labelValue}</Text>
      </CircleRipple>
    )
  }

  const NormalBox = () => {
    return (
      <Text style={labelStyleValue as {}}>{labelValue}</Text>
    )
  }

  const GradientBox = () => {
    return (
      <LinearGradient
        colors={colorValue as string[]}
        start={start}
        end={end}
        style={[styles.rippleContainer, { height: '100%', width: '100%' }]}
      >
        {ripple ? <RippleBox /> : <NormalBox />}
      </LinearGradient>
    )
  }

  return (
    <TouchableOpacity
      style={typeof (colorValue) == 'string'
        ? [styles.rippleContainer, { backgroundColor: colorValue }, containerStyle]
        : [styles.rippleContainer, containerStyle]}
      activeOpacity={rippleValue ? 1 : 0.2}
      onPress={!rippleValue ? onPress : () => null}
    >
      {rippleValue
        ? typeof (colorValue) == 'object'
          ? <GradientBox />
          : <RippleBox />
        : typeof (colorValue) == 'object'
          ? <GradientBox />
          : <NormalBox />}
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (theme: any) =>
  StyleSheet.create({
    rippleContainer: {
      width: '70%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      marginVertical: 10,
    },
    ripple: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });