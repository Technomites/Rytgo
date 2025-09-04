//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import Input from '../../shared/components/Input';
import MyInput from '../../shared/components/MyInput';
import {
  signIn,
  getPrice,
  getMotorPrice,
  signIncontact,
} from '../../shared/ApiMiddleware/api';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInput from '../../shared/components/PasswordInput';
import {useSelector, useDispatch} from 'react-redux';
import * as Filteraction from '../../redux/action/Filteraction';
import {
  _setLanguage,
  _setToken,
  _setUsereProfileData,
} from '../../shared/Constant/Constant';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import PopUpModel from '../../shared/components/PopUp';
import {resolvePlugin} from '@babel/core';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';

// create a component
const SignIn2 = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [loading, setloading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [popupvisble, setIspopupvisble] = useState(false);
  const [IsNetvisble, setIsNetvisble] = useState(false);

  const NavigateToNextScreen = () => {
    //navigation.replace('SignInOptpVerfication');
    dispatch(Filteraction.propertyFilter(null));
    dispatch(Filteraction.carFilter(null));

    const IsValidate = Validation();
    if (IsValidate === true) {
      getMasterDataproperty();
      getMasterDatamotor();
      _setUsereProfileData(null);
      setloading(true);
      const userData = {
        grant_type: 'password',
        username: email, //email  customer@nowbuysell.com
        password: password, //password  1234@Find
        deviceId: DeviceInfo.getUniqueId(),
        type: 'Customer',
      };
      //console.log(password);
      //console.log(email);
      signIn(userData)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (
            res?.error_description ===
            'Verify your contact number before login!'
          ) {
            setloading(false);
            GetUserContactDeatils();
          } else if (
            res?.error_description === 'Verify your email before login!'
          ) {
            setloading(false);
            seterrorValidation(res.error_description);
            setIspopupvisble(true);
          } else if (res?.access_token) {
            storeLoginData(res);
          } else {
            console.log('else condition' + res.error);
            setloading(false);
            seterrorValidation(res.error_description);
            setIspopupvisble(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const NavigateToNextScreenasaGuest = () => {
    setloading(true);
  };

  const GetUserContactDeatils = () => {
    // alert('fnction called ');
    setloading(true);
    const userData = {
      emailaddress: email,
      Password: password,
    };
    signIncontact(userData)
      .then(res => {
        console.log(res);
        setloading(false);
        if (res.success === false) {
          seterrorValidation(res.message);
          setIspopupvisble(true);
          setloading(false);
        } else if (res.success === true) {
          // alert('true');
          setloading(false);
          navigation.navigate('SignInOptpVerfication', {
            phoneNo: res.message,
          });
        }
      })
      .catch(err => {
        console.log(err);
        seterrorValidation(err);
        setIspopupvisble(true);
      });
  };

  function Validation() {
    if (email === '' || password === '') {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      return false;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (emailPattern.test(email) === false) {
      seterrorValidation('Email is Not Correct');
      setIspopupvisble(true);
      return false;
    }

    seterrorValidation('');
    return true;
  }
  const onChangeText = (value, name) => {
    if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Password') {
      setPassword(value);
    }
  };

  const getMasterDataproperty = () => {
    getPrice()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.success === true) {
          //console.log(' res blogs ' + JSON.stringify(res));
          console.log(res);
          const data = JSON.stringify(res);
          AsyncStorage.setItem('masterData', data);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMasterDatamotor = () => {
    getMotorPrice()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.success === true) {
          //console.log(' res blogs ' + JSON.stringify(res));
          console.log(res);
          setIsNetvisble(false);
          const data = JSON.stringify(res);
          AsyncStorage.setItem('masterDataMotor', data);
        } else {
          //alert('jjcdjdh');
          setIsNetvisble(true);

          console.log(res + 'error1 osama');
        }
      })
      .catch(err => {
        //alert('jjcdjdh');
        setIsNetvisble(true);
        console.log(err + 'error2 osama');
      });
  };

  const storeLoginData = async value => {
    try {
      // open these lines
      const data = JSON.stringify(value);
      await AsyncStorage.setItem('UserDataLogin', data);
      getData();
    } catch (e) {
      //alert('error savng kay');
      // saving error
    }
  };
  const storeGuestLogin = async () => {
    dispatch(Filteraction.propertyFilter(null));
    dispatch(Filteraction.carFilter(null));
    getMasterDataproperty();
    getMasterDatamotor();
    setloading(true);
    _setUsereProfileData(null);

    try {
      var value = {
        access_token: '',
        user: 'guest',
      };
      const data = JSON.stringify(value);
      await AsyncStorage.setItem('UserDataLogin', data);
      setTimeout(() => {
        setloading(false);
        //alert(IsNetvisble);
        // if (IsNetvisble === false) {
        navigation.replace('Mytab');
        // } else {
        //   seterrorValidation('Please Check your Internet Connection');
        //   setIspopupvisble(true);
        // }
      }, 4000);
    } catch (e) {
      //alert('error savng kay');
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserDataLogin');
      const token = await JSON.parse(value);
      console.log(token);
      setloading(false);
      if (token !== null) {
        console.log(token.access_token);
        tokenapi = token.access_token;
        _setToken(token.access_token);
        navigation.replace('Mytab');
      }
    } catch (e) {
      console.log('error');
      //console.log(e + ' oama');
      //alert('error');
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <Loader show={loading} />
      <SafeAreaView style={{width: '100%', height: '100%'}}>
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
            Success={false}
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
                  {/* {localizedString.signInPlaceholder} */}
                  Login
                </Text>
                <View
                  style={{
                    //height: '40%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'yellow',
                    // backgroundColor: 'red',
                    //flex: 1,
                  }}>
                  <View
                    style={{
                      width: '90%',
                      marginTop: 12,
                      //backgroundColor: 'red',
                    }}>
                    {/* <Input
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                }}
                placeholdertxt="(971)089-0784"
                placeholderTextColor="#191919"
                headingtxt="Phone Number"
                heading={{width: '80%', color: '#191919'}}
              /> */}
                    <MyInput
                      formTitle="Email"
                      placeHolder="Enter your email here"
                      onChange={onChangeText}
                    />
                    {/* <MyInput
                    formTitle={localizedString.passwordInput}
                    placeHolder="***************"
                    onChange={onChangeText}
                    secureText="true"
                  /> */}
                    <PasswordInput
                      //value={password}
                      formTitle="Password"
                      onChangeText={onChangeText}
                      placeHolder="Enter your Password here"
                      secure={secure ? true : false}
                      onIconPress={() => setSecure(prev => !prev)}
                      iconName={secure ? 'eye' : 'eye-off'}
                    />
                  </View>
                  <View
                    style={{
                      width: '90%',
                      //height: 10,
                      //backgroundColor: 'yellow',
                      //justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginTop: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('FogotPassword');
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 11,
                          color: '#0989B8',
                          fontFamily: 'Inter-SemiBold',
                          marginBottom: 5,
                          textTransform: 'uppercase',
                          //bottom: 6,
                        }}>
                        {/* {localizedString.forgotPassword} */}
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatButton
                    label="Sign IN"
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
                      navigation.navigate('SignUp');
                    }}>
                    <Text
                      style={{color: '#19191960', fontFamily: 'Inter-Medium'}}>
                      {/* {localizedString.signIndonthaveAccount} */}
                      Don't Have An Account?
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
                      {/* {localizedString.signUpText} */}
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'center',
                      //backgroundColor: 'red',
                      marginTop: 6,
                    }}>
                    <View
                      style={{
                        borderBottomColor: 'lightgrey',
                        borderBottomWidth: 1,
                      }}
                    />
                    <TouchableOpacity
                      style={{marginTop: 8}}
                      onPress={() => {
                        storeGuestLogin();
                      }}>
                      <Text
                        style={{
                          color: '#0989B8',
                          fontFamily: 'Inter-Medium',
                          textAlign: 'center',
                          //marginTop: 1,
                          marginBottom: 8,
                          textTransform: 'uppercase',
                          fontSize: 13,
                        }}>
                        {/* {localizedString.asaGuest} */}
                        Continue as Guest
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>
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

export default SignIn2;
