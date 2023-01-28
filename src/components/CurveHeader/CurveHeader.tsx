import { useMemo } from 'react';
import { View, ImageBackground, StyleSheet, StyleProp, ImageBackgroundProps, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

interface CurveHeaderContainerProps {
  CurveHeaderContainerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageBackground>;
}

type CurveHeaderProps = CurveHeaderContainerProps & ImageBackgroundProps;

const CurveHeader: React.FC<CurveHeaderProps> = ({ CurveHeaderContainerStyle, imageContainerStyle, imageStyle, source }) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.CurveHeaderContainer, CurveHeaderContainerStyle]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <ImageBackground style={[styles.image, imageStyle]} source={source} />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    CurveHeaderContainer: {
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
    image: {
      width: '100%',
      height: '100%',
      transform: [{ scaleX: 0.67 }],
    },
  });

export default CurveHeader;
