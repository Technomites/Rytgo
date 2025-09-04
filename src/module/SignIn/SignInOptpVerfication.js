//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import Input from '../../shared/components/Input';
import {colors} from '../../shared/themes/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {verifyOtp, ResendOtp} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import Loader from '../../shared/components/Loader';

// create a component
const SignInOptpVerfication = ({navigation, route}) => {
  const [errorValidation, seterrorValidation] = useState('');
  const [code, settcode] = useState('');
  const [loading, setloading] = useState(false);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [timer, setotpTimer] = useState(true);
  const inputEl = useRef(null);
  const NavigateToNextScreen = () => {
    navigation.replace('Mytab');
  };
  const OtpVerify = codeee => {
    //console.log(phoneNo);
    setloading(true);
    setTimeout(() => {
      settcode('');
    }, 300);

    const userData = {
      // future replace Contact field  phoneNo
      Contact: phoneNo,
      otp: codeee,
    };
    verifyOtp(userData)
      .then(res => {
        //console.log(' res  osama' + JSON.stringify(res));
        setloading(false);
        if (res.status === 'success') {
          if (name === 'profile') {
            navigation.replace('AccountInfo');
          } else {
            navigation.replace('SignIn2');
          }
        } else if (res.status === 'error') {
          seterrorValidation('OTP has been expired. Kindly resend again');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const ResendVerify = () => {
    //console.log(phoneNo);

    ResendOtp(phoneNo)
      .then(res => {
        //console.log(' res  osama' + JSON.stringify(res));
        if (res.status === 'success') {
          seterrorValidation('');
          setMinutes(1);
          setSeconds(60);
        } else if (res.status === 'error') {
          seterrorValidation('Failed to sent OTP');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      inputEl.current.focusField(0);
    }, 500);
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(60);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const {phoneNo, name} = route.params;
  return (
    // <ScrollView>
    <View style={styles.container}>
      <Loader show={loading} />
      <View style={styles.topContainer}>
        <Image
          resizeMode="contain"
          style={styles.tinyLogo}
          source={require('../../shared/assests/splash/icon.png')}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ImageBackground
          resizeMode="stretch"
          style={{width: '100%', height: 600}}
          source={require('../../shared/assests/signIn/building.png')}>
          <View style={styles.backgroundImg}>
            <Text style={styles.buttonText}>{localizedString.verfication}</Text>
            <Text style={styles.verificationText}>
              {localizedString.verificationheading}
            </Text>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text
                style={{fontSize: 14, color: colors.textColor, marginLeft: 20}}>
                {'+' + phoneNo}
                {/* 03323669609 */}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SignUp');
                }}>
                <Image
                  resizeMode="stretch"
                  style={{width: 14, height: 14, marginLeft: 6, marginTop: 4}}
                  source={require('../../shared/assests/signIn/pen.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.codeBtnContainer}>
              <View
                style={{
                  width: '89%',
                  //backgroundColor: 'green',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#19191990'}}>
                  {' '}
                  {localizedString.codetext}{' '}
                </Text>
                <OTPInputView
                  ref={inputEl}
                  style={{
                    width: '104%',
                    height: 80,
                    backgroundColor: 'rgba(0,0,0,0)',
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  pinCount={4}
                  code={code}
                  // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => { this.setState({code})}}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.codeinput}
                  codeInputHighlightStyle={{borderColor: '#0989B8'}}
                  //clearInputs={isEmptyString(code)}
                  onCodeChanged={code => {
                    settcode(code);
                  }}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                    OtpVerify(code);
                  }}
                />
              </View>
              {/* <FlatButton
                label={localizedString.proceedHolder}
                buttonStyle={{
                  width: '90%',
                  backgroundColor: '#0989B8',
                  paddingVertical: 14,
                }}
                labelStyle={{fontSize: 14, textTransform: 'uppercase'}}
                onPress={NavigateToNextScreen}></FlatButton> */}
              <TouchableOpacity
                //style={styles.button}
                onPress={ResendVerify}>
                <Text style={{color: '#19191990'}}>
                  {localizedString.resendCode}
                </Text>
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', color: colors.textColor}}>
                {minutes === 0 && seconds === 0 ? (
                  <Text> 0 : 0</Text>
                ) : (
                  <Text>
                    {' '}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                )}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                color: 'red',
                fontFamily: 'Inter-SemiBold',
                marginBottom: 5,
              }}>
              {errorValidation}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
    // </ScrollView>
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
    width: 160,
    height: 160,
  },
  topContainer: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    //height: '50%',
    //flex: 1,
    //height: 520,
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
  },
  backgroundImg: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 100,
  },
  codeBtnContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 23,
    color: colors.textColor,
    fontWeight: 'bold',
    marginHorizontal: 21,
  },

  verificationText: {
    fontSize: 14,
    color: colors.textColor,
    marginHorizontal: 21,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#0989B8',
  },
  codeinput: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#19191933',
    height: '70%',
    width: 70,
    marginRight: 7,
    color: 'black',
  },
});

export default SignInOptpVerfication;
