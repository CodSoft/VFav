import React, { useMemo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

//file
import CircleRipple from '../Ripple/CircleRipple';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  label?: string;
  color?: string[] | string;
  start?: { x: number, y: number };
  end?: { x: number, y: number };
  ripple?: boolean;
}

const Button: React.FC<ButtonProps> = ({ style, children, label, color, start, end, ripple, ...props }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  let labelValue = label ? label : 'Button';
  let rippleValue = ripple ? ripple : false;
  let colorValue = color ? color : 'blue';

  const RippleBox = () => {
    return (
      <CircleRipple
        style={styles.ripple}
        onTap={() => {
          console.log('tap');
        }}>
        <Text style={{ fontSize: 20, color: 'white' }}>{labelValue}</Text>
      </CircleRipple>
    )
  }

  const NormalBox = () => {
    return (
      <View style={[styles.rippleContainer]}>
        <Text style={{ fontSize: 20, color: 'white' }}>{labelValue}</Text>
      </View>
    )
  }

  const GradientBox = () => {
    return (
      <LinearGradient
        colors={colorValue as string[]}
        start={start}
        end={end}
        style={[styles.rippleContainer]}
      >
        {ripple ? <RippleBox /> : <NormalBox />}
      </LinearGradient>
    )
  }

  return (
    <TouchableOpacity
      style={typeof (colorValue) == 'string'
        ? [styles.rippleContainer, { backgroundColor: colorValue }]
        : null}
      activeOpacity={rippleValue ? 1 : 0.2}
      onPress={() => {}}
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