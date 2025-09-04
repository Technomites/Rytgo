//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import Input from '../../shared/components/Input';
import MyInput from '../../shared/components/MyInput';
import {forgotPassword} from '../../shared/ApiMiddleware/api';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInput from '../../shared/components/PasswordInput';
import {_setToken, _setUsereProfileData} from '../../shared/Constant/Constant';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import PopUpModel from '../../shared/components/PopUp';
import {resolvePlugin} from '@babel/core';

// create a component
const FogotPassword = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [loading, setloading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [popupvisble, setIspopupvisble] = useState(false);
  const [success, setsuccess] = useState(false);

  const NavigateToNextScreen = () => {
    if (email === '') {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      return false;
    }
    setloading(true);
    const userData = {
      EmailAddress: email,
    };
    forgotPassword(userData)
      .then(res => {
        console.log(' res  osama' + JSON.stringify(res));
        if (res.status === 'error') {
          setloading(false);
          seterrorValidation(res.message);
          setsuccess(false);
          setIspopupvisble(true);
        } else if (res.status === 'success') {
          setloading(false);
          setsuccess(true);
          seterrorValidation(res.message);
          setIspopupvisble(true);
        } else if (res.status === 'failure') {
          setloading(false);
          setsuccess(false);
          seterrorValidation(res.message);
          setIspopupvisble(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  function Validation() {
    if (email === '' || password === '') {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      setsuccess(false);
      return false;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (emailPattern.test(email) === false) {
      seterrorValidation('Email is Not Correct');
      setIspopupvisble(true);
      setsuccess(false);
      return false;
    }

    seterrorValidation('');
    return true;
  }
  const onChangeText = (value, name) => {
    if (name === localizedString.emailphoneInput) {
      setEmail(value);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <Loader show={loading} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            resizeMode="center"
            style={styles.tinyLogo}
            source={require('../../shared/assests/splash/icon.png')}
          />
        </View>
        <PopUpModel
          visible={popupvisble}
          message={errorValidation}
          Success={success}
          btntext="Okay"
          onPress={() => {
            seterrorValidation('');
            setIspopupvisble(false);
          }}
        />
        <View style={styles.bottomContainer}>
          <ImageBackground
            resizeMode="stretch"
            style={{width: '100%', height: 720}}
            source={require('../../shared/assests/signIn/building.png')}>
            <View style={styles.backgroundImg}>
              <Text style={styles.buttonText}>
                {localizedString.forgetPasswordPlaceholder}
              </Text>
              <View
                style={{
                  //height: '40%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //backgroundColor: 'yellow',
                  //backgroundColor: 'red',
                  //flex: 1,
                }}>
                <View
                  style={{
                    width: '90%',
                    marginTop: 12,
                    //backgroundColor: 'red',
                  }}>
                  <MyInput
                    formTitle={localizedString.emailphoneInput}
                    placeHolder={localizedString.emailplaceholder}
                    onChange={onChangeText}
                  />
                </View>

                <FlatButton
                  label={localizedString.proceedText}
                  buttonStyle={{
                    width: '90%',
                    backgroundColor: '#0989B8',
                    paddingVertical: 14,
                    //marginVertical: 15,
                  }}
                  labelStyle={{fontSize: 14, textTransform: 'uppercase'}}
                  onPress={NavigateToNextScreen}></FlatButton>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignIn2');
                  }}>
                  <Text
                    style={{color: '#19191960', fontFamily: 'Inter-Medium'}}>
                    {localizedString.signIndonthaveAccount}
                  </Text>
                  <Text
                    style={{
                      color: '#0989B8',
                      fontFamily: 'Inter-Medium',
                      fontSize: 14,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontSize: 11,
                    }}>
                    {localizedString.signInPlaceholder}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    //backgroundColor: 'red',
  },
  passworddiv: {},
  backgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    //marginTop: 20,
    //backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 21,
    color: '#191919',
    fontWeight: 'bold',
    marginHorizontal: 23,
  },
});

export default FogotPassword;
