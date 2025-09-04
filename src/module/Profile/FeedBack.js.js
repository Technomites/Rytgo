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
import {sendFeedback} from '../../shared/ApiMiddleware/api';
import {localizedString} from '../../shared/localization/localization';
import PopUpModel from '../../shared/components/PopUp';
import Loader from '../../shared/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {_setLanguage} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const FeedBack = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [feedback, setFeedback] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [popupvisble, setIspopupvisble] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const onChangeText = (value, name) => {
    if (name === localizedString.feedbackText) {
      setFeedback(value);
    }
  };
  function Validation() {
    if (feedback === '') {
      seterrorValidation(localizedString.fieldemypt);
      setIspopupvisble(true);
      setSuccess(false);
      return false;
    }
    seterrorValidation('');
    return true;
  }
  const SendFeedBack = () => {
    console.log('call');
    const IsValidate = Validation();
    if (IsValidate === true) {
      setloading(true);
      const feedData = {
        suggestion: feedback,
      };
      //console.log(feedback);
      sendFeedback(feedData)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            //props.navigation.goBack();
            //alert('feedback send');
            setSuccess(true);
            setloading(false);
            setIspopupvisble(true);
            seterrorValidation(localizedString.feedbacksuccessmessage);
          } else {
            //storeLoginData(res);
            setSuccess(false);
            setIspopupvisble(true);
            seterrorValidation(res.message + 'Session expired!');
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
        title={localizedString.feedbackText}
        onPress={() => props.navigation.goBack()}
      />

      <View style={{padding: 16, height: '75%'}}>
        <Text
          style={{color: '#191919', fontFamily: 'Inter-Bold', fontSize: 15}}>
          {localizedString.sendusFeedbackText}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <Text
            style={{
              color: '#11111180',
              fontFamily: 'Inter-SemiBold',
              fontSize: 12,
            }}>
            {localizedString.deatilfeedbackText}
          </Text>
        </View>
        <View style={{marginTop: 12}}>
          {/* <MyInput formTitle="Name" placeHolder="Bobby Sullivan" /> */}

          {/* <MyInput formTitle="Email" placeHolder="bobby.sullivan@email.com" /> */}

          <MyInput
            desc
            formTitle={localizedString.feedbackText}
            placeHolder={localizedString.typeherePlaceholder}
            onChange={onChangeText}
            value={feedback}
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
          onPress={SendFeedBack}></FlatButton>
      </View>
      {/* </ScrollView> */}
      <PopUpModel
        visible={popupvisble}
        message={errorValidation}
        Success={success}
        btntext="Okay"
        onPress={() => {
          if (errorValidation.includes('denied')) {
            AsyncStorage.clear();
            setLanguage('en');
            _setLanguage('en');
            //props.navigation.replace('SignIn2');
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
export default FeedBack;
