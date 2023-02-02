import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//file
import CurveHeader from '../../components/CurveHeader/CurveHeader';
import BackButton from '../../components/Buttons/BackButton';
import Form from '../../components/Form/Form';

const window = Dimensions.get('window');

const Home = ({ navigation, route }: any) => {
  const theme = useSelector((state: any) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.screenContainer}>
        <CurveHeader source={require('../../../assets/images/VFav_Header.png')} />
        <View style={styles.Container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="filter-variant" size={40} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontSize: 10, color: 'white' }}>Sort by</Text>
              <Text style={{ fontSize: 13, color: 'white' }}>Popularity</Text>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                width: '10%',
                height: undefined,
                aspectRatio: 1,
                overflow: 'hidden',
                right: 0,
                position: 'absolute',
              }}
            >
              <Image source={require('../../../assets/favicon.png')} resizeMode="contain" style={{ flex: 1, height: undefined, width: undefined }} />
            </TouchableOpacity>
          </View>

          {/* <List/> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      minHeight: Math.round(window.height),
    },
    screenContainer: {
      flex: 1,
    },
    Container: {
      flex: 1,
      position: 'absolute',
      right: 0,
      left: 0,
      margin: '5%',
    },
  });

export default Home;
