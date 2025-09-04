//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import FlatButton from '../../shared/components/FlatButton';
import MyInput from '../../shared/components/MyInput';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {changePassword} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import PopUpModel from '../../shared/components/PopUp';
import Loader from '../../shared/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordInput from '../../shared/components/PasswordInput';
import {languagee, _setLanguage} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const ChangePassword = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [feedback, setFeedback] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [popupvisble, setIspopupvisble] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const onChangeText = (value, name) => {
    if (name === localizedString.passwordInput) {
      setoldpassword(value);
    } else if (name === localizedString.newpassword) {
      setnewpassword(value);
    } else if (name === localizedString.confirmnewpassword) {
      setconfirmpassword(value);
    }
  };
  function Validation() {
    var passwordreg = new RegExp(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{8,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*/+(){}=!.<>|:-?_<>";'~`]{8,}$/,
    );
    if (oldpassword === '' || newpassword === '' || confirmpassword === '') {
      seterrorValidation(localizedString.fieldemypt);
      setIspopupvisble(true);
      setSuccess(false);
      return false;
    }
    if (passwordreg.test(newpassword) === false) {
      seterrorValidation(localizedString.passworderror);
      setIspopupvisble(true);
      return false;
    }
    if (passwordreg.test(confirmpassword) === false) {
      seterrorValidation(localizedString.passworderror);
      setIspopupvisble(true);
      return false;
    }

    seterrorValidation('');
    return true;
  }

  const changePasswordfun = () => {
    const IsValidate = Validation();
    if (IsValidate === true) {
      setloading(true);
      const data = {
        CurrentPassword: oldpassword,
        NewPassword: newpassword,
        ConfirmPassword: confirmpassword,
      };
      //console.log(feedback);
      changePassword(data)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            //props.navigation.goBack();
            //alert('feedback send');
            setSuccess(true);
            setloading(false);
            setIspopupvisble(true);
            seterrorValidation(localizedString.changepasswordsuccessmessage);
          } else {
            //storeLoginData(res);
            setSuccess(false);
            setIspopupvisble(true);
            seterrorValidation(res.message);
            setloading(false);
          }
        })
        .catch(err => {
          setloading(false);
          console.log(err);
        });
    }
  };

  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      {/* <ScrollView> */}
      <Loader show={loading} />
      <BackHeader
        title={localizedString.changepassword}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{padding: 16, height: '75%'}}>
        <View style={{marginTop: 2}}>
          <PasswordInput
            //value={password}
            formTitle={localizedString.passwordInput}
            onChangeText={onChangeText}
            placeHolder={localizedString.passwordplaceholder}
            secure={secure ? true : false}
            onIconPress={() => setSecure(prev => !prev)}
            iconName={secure ? 'eye' : 'eye-off'}
          />
        </View>
        <View style={{marginTop: 2}}>
          <PasswordInput
            //value={password}
            formTitle={localizedString.newpassword}
            onChangeText={onChangeText}
            placeHolder={localizedString.newpasswordplaceholder}
            secure={secure1 ? true : false}
            onIconPress={() => setSecure1(prev => !prev)}
            iconName={secure1 ? 'eye' : 'eye-off'}
          />
        </View>
        <View style={{marginTop: 2}}>
          <PasswordInput
            //value={password}
            formTitle={localizedString.confirmnewpassword}
            onChangeText={onChangeText}
            placeHolder={localizedString.confirmpasswordplaceholder}
            secure={secure2 ? true : false}
            onIconPress={() => setSecure2(prev => !prev)}
            iconName={secure2 ? 'eye' : 'eye-off'}
          />
        </View>
      </View>
      <View
        style={{
          //padding: 20,
          height: '25%',
          //backgroundColor: 'yellow',
          //justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <FlatButton
          label={localizedString.sendText}
          buttonStyle={{
            width: '87%',
            backgroundColor: '#0989B8',
            borderRadius: 6,
            paddingVertical: 11,
          }}
          labelStyle={{textTransform: 'uppercase', fontSize: 16}}
          onPress={() => {
            changePasswordfun();
          }}></FlatButton>
      </View>
      {/* </ScrollView> */}
      <PopUpModel
        visible={popupvisble}
        message={errorValidation}
        Success={success}
        btntext={localizedString.okayText}
        onPress={() => {
          if (errorValidation.includes('denied')) {
            AsyncStorage.clear();
            //props.navigation.replace('SignIn2');
            setLanguage('en');
            _setLanguage('en');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'SignIn2'}],
            });
          } else {
            setFeedback('');
            setIspopupvisble(false);
            setSuccess(false);
          }
        }}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ChangePassword;
