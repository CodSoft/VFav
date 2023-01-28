import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import color from 'color';
import { useSelector } from 'react-redux';

const BACKGROUND = '#ff5757';
const RADIUS = 10;
const CONTAINER_BACKGROUND = '#ffffff';

interface NeuViewProps {
  radius?: number;
  style?: any;
  revert?: boolean;
  borderless?: boolean;
  children?: React.ReactNode;
}

const NeuView: React.FC<NeuViewProps> = ({ radius, style, revert, borderless, children }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const topStyles = StyleSheet.create([
    styles.morphTop,
    revert && {
      shadowColor: color(BACKGROUND).darken(0.3).alpha(0.5),
    },
    { borderRadius: radius || RADIUS },
    style,
  ]);

  const bottomStyles = StyleSheet.create([
    styles.morphBottom,
    revert && {
      shadowColor: color(BACKGROUND).lighten(0.5).alpha(0.5),
    },
    { borderRadius: radius || RADIUS },
    style,
  ]);

  const morphStyles = StyleSheet.create([styles.morph, borderless && { borderWidth: 0 }, { borderRadius: radius || RADIUS }, style]);

  return (
    <View style={styles.container}>
      <View style={topStyles}>
        <View style={bottomStyles}>
          <View style={morphStyles}>{children}</View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    neumorphism: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    morph: {
      borderRadius: RADIUS,
      borderWidth: 1,
      backgroundColor: CONTAINER_BACKGROUND,
      borderColor: color(BACKGROUND).lighten(0.5).alpha(0.2).toString(),
      elevation: 10,
    },
    morphTop: {
      borderRadius: RADIUS,
      shadowOffset: {
        width: -6,
        height: -6,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      shadowColor: color(BACKGROUND).lighten(0.5).alpha(0.5).toString(),
      elevation: 10,
    },
    morphBottom: {
      borderRadius: RADIUS,
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      shadowColor: color(BACKGROUND).darken(0.3).alpha(0.5).toString(),
      elevation: 10,
    },
  });

export default NeuView;
