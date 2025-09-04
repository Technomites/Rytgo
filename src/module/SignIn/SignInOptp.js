//import liraries
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import Input from '../../shared/components/Input';

// create a component
const SignInOptp = ({navigation, route}) => {
  const NavigateToNextScreen = () => {
    navigation.replace('SignInOptpVerfication');
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
          resizeMode="stretch"
          style={{width: '100%', height: 700}}
          source={require('../../shared/assests/signIn/building.png')}>
          <View style={styles.backgroundImg}>
            <Text style={styles.buttonText}>Sign in via OTP</Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 12,
              }}>
              <Input
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                }}
                placeholdertxt="(971)089-0784"
                placeholderTextColor="#191919"
                headingtxt="Phone Number"
                heading={{width: '80%', color: '#191919'}}
              />
              <FlatButton
                label="SIGN IN"
                buttonStyle={{
                  width: '80%',
                  backgroundColor: '#0989B8',
                  paddingVertical: 14,
                  //marginVertical: 15,
                }}
                labelStyle={{fontSize: 14}}
                onPress={NavigateToNextScreen}></FlatButton>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

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
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 23,
    color: '#191919',
    fontWeight: 'bold',
    marginLeft: 35,
  },
});

export default SignInOptp;
