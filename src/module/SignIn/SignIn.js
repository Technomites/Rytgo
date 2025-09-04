//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import {localizedString} from '../../shared/localization/localization';

// create a component
const SignIn = ({navigation, route}) => {
  const NavigateToNextScreen = () => {
    navigation.replace('SignIn2');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          resizeMode="center"
          style={styles.tinyLogo}
          source={require('../../shared/assests/splash/icon.png')}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../shared/assests/signIn/building.png')}>
          <View style={styles.backgroundImg}>
            {/* <Text
              style={{height: 100, width: 300, backgroundColor: 'red'}}
              onPress={() => {
                setLanguage('ar');
              }}>
              osamaasddsfsd
            </Text> */}
            <Text style={styles.buttonText}>{localizedString.welcome}</Text>
            {/* Welcome to,*/}
            <Image
              resizeMode="contain"
              style={{width: 120}}
              source={require('../../shared/assests/signIn/NowBuySell.png')}
            />
            <FlatButton
              label="Welcome"
              buttonStyle={{
                width: '80%',
                backgroundColor: '#0989B8',
                textTransform: 'uppercase',
              }}
              labelStyle={{
                fontSize: 17,
              }}
              onPress={NavigateToNextScreen}></FlatButton>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

// define your styles
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
  topContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    height: '50%',
    width: '100%',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#191919',
  },
});

//make this component available to the app
export default SignIn;
