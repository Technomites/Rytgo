// import libraries
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Text from '../../shared/components/DerivedText';
import {colors, FontFamily} from '../../shared/themes/theme';
import {OtpInput} from 'react-native-otp-entry'; // ✅ new package
import {verifyOtp, ResendOtp} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import Loader from '../../shared/components/Loader';

// create a component
const SignInOptpVerfication = ({navigation, route}) => {
  const [errorValidation, seterrorValidation] = useState('');
  const [code, setCode] = useState('');
  const [loading, setloading] = useState(false);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(60);

  const {phoneNo, name} = route.params;

  const NavigateToNextScreen = () => {
    navigation.replace('Mytab');
  };

  const OtpVerify = otpCode => {
    setloading(true);
    setTimeout(() => {
      setCode('');
    }, 300);

    const userData = {
      Contact: phoneNo,
      otp: otpCode,
    };
    verifyOtp(userData)
      .then(res => {
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
        setloading(false);
      });
  };

  const ResendVerify = () => {
    ResendOtp(phoneNo)
      .then(res => {
        if (res.status === 'success') {
          seterrorValidation('');
          setMinutes(1);
          setSeconds(60);
        } else if (res.status === 'error') {
          seterrorValidation('Failed to send OTP');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(60);
        }
      }
    }, 1000);
    return () => clearInterval(myInterval);
  }, [seconds, minutes]);

  return (
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
              </Text>
              <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                <Image
                  resizeMode="stretch"
                  style={{width: 14, height: 14, marginLeft: 6, marginTop: 4}}
                  source={require('../../shared/assests/signIn/pen.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.codeBtnContainer}>
              <Text style={{color: '#19191990'}}>
                {localizedString.codetext}
              </Text>

              {/* ✅ NEW OTP COMPONENT */}
              <OtpInput
                numberOfDigits={4}
                focusColor={colors.blue}
                onTextChange={setCode}
                onFilled={OtpVerify}
                theme={{
                  containerStyle: {marginVertical: 10},
                  pinCodeContainerStyle: styles.codeinput,
                  pinCodeTextStyle: {color: 'black', fontSize: 20},
                }}
              />

              <TouchableOpacity onPress={ResendVerify}>
                <Text style={{color: '#19191990'}}>
                  {localizedString.resendCode}
                </Text>
              </TouchableOpacity>

              <Text style={{fontWeight: 'bold', color: colors.textColor}}>
                {minutes === 0 && seconds === 0 ? (
                  <Text>0 : 0</Text>
                ) : (
                  <Text>
                    {' '}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </Text>
                )}
              </Text>
            </View>

            <Text style={styles.errorText}>{errorValidation}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

// styles
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
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    marginTop: 100,
  },
  codeBtnContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  codeinput: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#19191933',
    height: 60,
    width: 65,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 11,
    color: 'red',
    fontFamily: FontFamily.SemiBold,
    marginBottom: 5,
  },
});

export default SignInOptpVerfication;
