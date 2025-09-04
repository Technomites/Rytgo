//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatButton from '../../shared/components/FlatButton';

import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import {localizedString} from '../../shared/localization/localization';
import {_setToken, _setLanguage} from '../../shared/Constant/Constant';
import messaging from '@react-native-firebase/messaging';

export default function Splash({navigation}) {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('LanguageKey');
      if (value !== null) {
        //setLanguage(value);
        //_setLanguage(value);
        //console.log(value);
        setLanguage('en');
        _setLanguage('en');
      } else {
        setLanguage('en');
        _setLanguage('en');
        console.log('en');
      }
    } catch (e) {
      //alert('error ' + e);
    }
  };
  const getuserDeatils = async () => {
    try {
      const value = await AsyncStorage.getItem('UserDataLogin');
      console.log(value);

      const token = await JSON.parse(value);
      console.log(token);
      if (token !== null) {
        //console.log(token.access_token);
        tokenapi = token.access_token;
        _setToken(token.access_token);
        setTimeout(() => navigation.replace('Mytab'), 1000); //Mytab
      } else {
        //alert('null');
        setTimeout(() => navigation.replace('SignIn'), 2000);
      }
    } catch (e) {
      console.log('error');
      //console.log(e + ' oama');
      //alert('error');
    }
  };
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }
  useEffect(() => {
    StatusBar.setBackgroundColor('#F6F8F9');
    StatusBar.setBarStyle('dark-content');
    getData();
    getuserDeatils();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.tinyLogo}
          source={require('../../shared/assests/splash/icon.png')}
        />
      </View>

      <Text style={styles.buttonText}>{localizedString.welcome}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8F9',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

//export default Splash;
