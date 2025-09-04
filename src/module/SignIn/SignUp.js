import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../../shared/components/DerivedText';
import FlatButton from '../../shared/components/FlatButton';
import MyInput from '../../shared/components/MyInput';
import {signUp} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import Loader from '../../shared/components/Loader';
import IoIcon from '../../shared/components/Icon/IoIcon';
import PasswordInput from '../../shared/components/PasswordInput';
import PopUpModel from '../../shared/components/PopUp';

// create a component
const SignIn2 = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [loading, setloading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [popupvisble, setIspopupvisble] = useState(false);

  const NavigateToNextScreen = () => {
    // navigation.replace('SignInOptpVerfication', {
    //   phoneNo: '971' + phone,
    //   name: 'signUp',
    // });

    const IsValidate = Validation();
    if (IsValidate === true) {
      setloading(true);
      const userData = {
        UserName: name,
        Email: email,
        Contact: '971' + phone,
        Password: password,
      };
      signUp(userData)
        .then(res => {
          setloading(false);

          //console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'Failed') {
            seterrorValidation('User already exists!');
            setIspopupvisble(true);
          } else if (res.status === 'success') {
            navigation.replace('SignInOptpVerfication', {
              phoneNo: '971' + phone,
              name: 'signUp',
            });
          }
        })
        .catch(err => {
          console.log(err);
          seterrorValidation(err);
        });
    }
  };

  const onChangeText = (value, name) => {
    if (name === 'Name') {
      //alert(value);
      setName(value);
    } else if (name === 'Email') {
      setEmail(value);
    } else if (name === 'Phone') {
      setPhone(value);
    } else if (name === 'Password') {
      setPassword(value);
    } else if (name === 'Confirm Password') {
      setconfirmPassword(value);
    }
  };

  function Validation() {
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      seterrorValidation('Fields are Empty');
      setIspopupvisble(true);
      return false;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    var passwordreg = new RegExp(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{8,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*/+(){}=!.<>|:-?_<>";'~`]{8,}$/,
    );

    var phonePattern = new RegExp(/^[0-9\b]+$/);
    if (emailPattern.test(email) === false) {
      seterrorValidation('Email is Not Correct');
      setIspopupvisble(true);
      return false;
    }
    if (phonePattern.test(phone) === false) {
      seterrorValidation('Phone Number is Not Correct');
      setIspopupvisble(true);
      return false;
    }
    if (passwordreg.test(password) === false) {
      seterrorValidation(
        'Password is Not Correct.Must contain atleast 8 characters and one number',
      );
      setIspopupvisble(true);
      return false;
    }
    console.log(password + ' ' + confirmPassword);
    if (password !== confirmPassword) {
      seterrorValidation('Password doesnot match');
      setIspopupvisble(true);
      return false;
    }
    seterrorValidation('');
    return true;
  }
  return (
    <>
      <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
          <Loader show={loading} />

          <ScrollView
            style={styles.mainContainer}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}>
            <View
              style={{
                height: 50,
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <IoIcon name="arrow-back" size={27} color="black" />
              </TouchableOpacity>
            </View>
            {/* <SafeAreaView> */}
            <ImageBackground
              source={require('../../shared/assests/signIn/authBgWhite.png')}
              resizeMode="stretch"
              style={{
                height: 210,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 160, width: 160, resizeMode: 'contain'}}
                source={require('../../shared/assests/splash/icon.png')}
              />
            </ImageBackground>
            <View>
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
              <View style={{width: '100%', marginBottom: 13}}>
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      color: colors.headingColor,
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginHorizontal: 19,
                    }}>
                    {/* {localizedString.signUpText} */}
                    Sign Up
                  </Text>
                </View>
              </View>
              <View
                style={{
                  //height: '40%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  //flex: 1,
                }}>
                <View
                  style={{
                    width: '90%',
                    //marginTop: 12,
                    //backgroundColor: 'red',
                  }}>
                  {/* <Text style={{fontSize: 15, color: 'black'}}>Name</Text> */}
                  <MyInput
                    //formTitle={localizedString.nameInput}
                    formTitle="Name"
                    placeHolder="Enter your name here"
                    onChange={onChangeText}
                  />
                  <MyInput
                    //formTitle={localizedString.emailInpit}
                    formTitle="Email"
                    placeHolder="Enter your email here"
                    onChange={onChangeText}
                  />
                  <MyInput
                    //formTitle={localizedString.phoneInput}
                    formTitle="Phone"
                    number="hdhhd"
                    placeHolder="Enter your phone number here"
                    onChange={onChangeText}
                    keyboardType="numeric"
                    maxlength={9}

                    //value="+971"
                  />
                  <PasswordInput
                    //value={password}
                    //formTitle={localizedString.passwordInput}
                    formTitle="Password"
                    onChangeText={onChangeText}
                    placeHolder="Enter your password here"
                    secure={secure ? true : false}
                    onIconPress={() => setSecure(prev => !prev)}
                    iconName={secure ? 'eye' : 'eye-off'}
                  />
                  {/* <MyInput
                formTitle={localizedString.passwordInput}
                placeHolder="***************"
                onChange={onChangeText}
                secureText="true"
              /> */}
                  {/* <MyInput
                formTitle={localizedString.confirmpasswordInput}
                placeHolder="Enter your confirm password here"
                onChange={onChangeText}
                secureText="true"
              /> */}
                  <PasswordInput
                    //value={password}
                    //formTitle={localizedString.confirmpasswordInput}
                    formTitle="Confirm Password"
                    onChangeText={onChangeText}
                    placeHolder="Enter your confirm password here"
                    secure={secure ? true : false}
                    onIconPress={() => setSecure(prev => !prev)}
                    iconName={secure ? 'eye' : 'eye-off'}
                  />
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
                <FlatButton
                  label="Sign UP"
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
                    navigation.replace('SignIn2');
                  }}>
                  <Text
                    style={{color: '#19191960', fontFamily: 'Inter-Medium'}}>
                    {/* {localizedString.signUpAlreadyAccount} */}
                    Already have an account
                  </Text>
                  <Text
                    style={{
                      color: '#0989B8',
                      fontFamily: 'Inter-Medium',
                      fontSize: 13,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}>
                    {/* {localizedString.signInPlaceholder} */}
                    Login
                  </Text>
                </TouchableOpacity>
                <Text></Text>
              </View>
            </View>
            {/* </View> */}
            {/* </SafeAreaView> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.authBgGray,
  },

  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8F9',
  },
  tinyLogo: {
    width: 170,
    height: 170,
  },
  topContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    height: '75%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  backgroundImg: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 50,
    //backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 23,
    color: '#191919',
    fontWeight: 'bold',
    marginLeft: 35,
  },
});

export default SignIn2;
