/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import Navigation from './src/navigation/navigation';
import {RTLProvider} from 'react-native-easy-localization-and-rtl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {_setToken} from './src/shared/Constant/Constant';
import {Value} from 'react-native-reanimated';
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('UserData');
  //     const token = await JSON.parse(value);
  //     console.log(token);
  //     if (token !== null) {
  //       //alert('call ' + value);
  //       //alert(value);
  //       console.log(token.access_token);
  //       //accessTokenn = token.access_token;
  //     }
  //   } catch (e) {
  //     console.log(e + ' oama');
  //     alert('error');
  //     // error reading value
  //   }
  // };

  AsyncStorage.getItem('UserDataLogin').then(r => {
    // alert(r);
    _setToken(JSON.parse(r));
  });
  // AsyncStorage.getItem('role').then(r => {
  //   // alert(r);
  //   _setuserRole(JSON.parse(r));
  // });
  return (
    <RTLProvider>
      <Navigation />
    </RTLProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
