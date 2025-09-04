//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import FlatButton from '../../shared/components/FlatButton';
import MyInput from '../../shared/components/MyInput';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {contactUsConfiguration} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import {contactUs} from '../../shared/ApiMiddleware/api';
import PopUpModel from '../../shared/components/PopUp';
import {_setLanguage} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
// create a component
const ContactUs = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [socialLinks, setsocialLinks] = useState({});
  const [contactdeatils, setcontactdeatils] = useState();
  const [loading, setloading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setsubject] = useState('');
  const [descripation, setdescripation] = useState('');
  const [errorValidation, seterrorValidation] = useState('');
  const [popupvisble, setIspopupvisble] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setloading(true);
    contactUsConfiguration()
      .then(res => {
        //console.log(' res ' + JSON.stringify(res));
        if (res.status === 'success') {
          //console.log(' res blogs ' + JSON.stringify(res));
          setloading(false);
          setsocialLinks(res.config.businessSetting.socialMediaLinks);
          setcontactdeatils(res.config.businessSetting.contactDetails);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const openUrl = url => {
    Linking.openURL(url).catch(err => console.error('Error', err));
  };

  const onChangeText = (value, name) => {
    if (name === localizedString.nameInput) {
      setName(value);
    }
    if (name === localizedString.emailInpit) {
      setEmail(value);
    }
    if (name === localizedString.subjectText) {
      setsubject(value);
    }
    if (name === localizedString.meesageText) {
      setdescripation(value);
    }
  };

  function Validation() {
    if (name === '' || email === '' || subject === '' || descripation === '') {
      seterrorValidation(localizedString.fieldemypt);
      setIspopupvisble(true);
      setSuccess(false);
      return false;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (emailPattern.test(email) === false) {
      seterrorValidation(localizedString.emailerror);
      setIspopupvisble(true);
      setSuccess(false);
      return false;
    }
    seterrorValidation('');
    return true;
  }

  const ContactUs = () => {
    const IsValidate = Validation();
    if (IsValidate === true) {
      setloading(true);
      const Data = {
        Name: name,
        Email: email,
        Contact: contactdeatils?.contactNo,
        Subject: subject,
        Message: descripation,
      };
      contactUs(Data)
        .then(res => {
          console.log(' res  osama' + JSON.stringify(res));
          if (res.status === 'success') {
            //props.navigation.goBack();
            //alert('feedback send');
            setSuccess(true);
            setloading(false);
            seterrorValidation(localizedString.contectussucessmessage);
            setIspopupvisble(true);
          } else {
            //storeLoginData(res);
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
      <Loader show={loading} />

      {contactdeatils !== null &&
      contactdeatils !== '' &&
      contactdeatils !== undefined ? (
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}>
          <BackHeader
            title={localizedString.contactText}
            onPress={() => props.navigation.goBack()}
          />

          <View style={{padding: 20, flex: 0.8}}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-Bold',
                fontSize: 17,
              }}>
              {localizedString.getintouchText}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 12, marginLeft: 4}}>
              <Image
                resizeMode="cover"
                style={
                  {
                    //  width: '100%',
                    //height: 200,
                  }
                }
                source={require('../../shared/assests/Profile/phone.png')}
              />
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 14,
                  marginLeft: 8,
                }}>
                {contactdeatils.contactNo}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 9, marginLeft: 4}}>
              <Image
                resizeMode="cover"
                style={
                  {
                    //  width: '100%',
                    //height: 200,
                  }
                }
                source={require('../../shared/assests/Profile/envelope.png')}
              />
              <Text
                style={{
                  color: '#191919',
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 14,
                  marginLeft: 8,
                }}>
                {contactdeatils.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              {socialLinks.facebook === '-' ? null : (
                <TouchableOpacity onPress={() => openUrl(socialLinks.facebook)}>
                  <Image
                    resizeMode="cover"
                    style={
                      {
                        //  width: '100%',
                        //height: 200,
                        //backgroundColor: 'red',
                      }
                    }
                    source={require('../../shared/assests/Profile/facebook.png')}
                  />
                </TouchableOpacity>
              )}
              {socialLinks.facebook === '-' ? null : (
                <TouchableOpacity
                  onPress={() => openUrl(socialLinks.instagram)}>
                  <Image
                    resizeMode="cover"
                    style={
                      {
                        //  width: '100%',
                        //height: 200,
                      }
                    }
                    source={require('../../shared/assests/Profile/instagram.png')}
                  />
                </TouchableOpacity>
              )}

              {socialLinks.facebook === '-' ? null : (
                <TouchableOpacity onPress={() => openUrl(socialLinks.twitter)}>
                  <Image
                    resizeMode="cover"
                    style={
                      {
                        //  width: '100%',
                        //height: 200,
                      }
                    }
                    source={require('../../shared/assests/Profile/twitter.png')}
                  />
                </TouchableOpacity>
              )}
              {socialLinks.facebook === '-' ? null : (
                <TouchableOpacity onPress={() => openUrl(socialLinks.linkedIn)}>
                  <Image
                    resizeMode="cover"
                    style={
                      {
                        //  width: '100%',
                        //height: 200,
                      }
                    }
                    source={require('../../shared/assests/Profile/linkedin.png')}
                  />
                </TouchableOpacity>
              )}
              {socialLinks.facebook === '-' ? null : (
                <TouchableOpacity
                  onPress={() =>
                    openUrl(
                      `https://api.whatsapp.com/send?phone=${
                        contactdeatils.contactNo
                      }&text=${encodeURIComponent('Hi..')}`,
                    )
                  }>
                  <Image
                    resizeMode="cover"
                    style={
                      {
                        //  width: '100%',
                        //height: 200,
                      }
                    }
                    source={require('../../shared/assests/Profile/whatsapp.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                //flexDirection: 'row',
                marginTop: 16,
              }}>
              {/* <HorizontalLine /> */}
            </View>
            <View style={{marginTop: 10}}>
              <MyInput
                formTitle={localizedString.nameInput}
                placeHolder={localizedString.nameplaceholder}
                onChange={onChangeText}
                value={name}
              />

              <MyInput
                formTitle={localizedString.emailInpit}
                placeHolder={localizedString.emailplaceholder}
                onChange={onChangeText}
                value={email}
              />
              <MyInput
                formTitle={localizedString.subjectText}
                placeHolder={localizedString.subjectplaceholder}
                onChange={onChangeText}
                value={subject}
              />

              <MyInput
                desc
                formTitle={localizedString.meesageText}
                placeHolder={localizedString.messageplaceholder}
                onChange={onChangeText}
                value={descripation}
              />
            </View>
          </View>

          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatButton
              label={localizedString.sendText}
              labelStyle={{textTransform: 'uppercase', fontSize: 15}}
              onPress={ContactUs}
              buttonStyle={{
                width: '89%',
                backgroundColor: '#0989B8',
              }}></FlatButton>
          </View>
          <PopUpModel
            visible={popupvisble}
            Success={success}
            btntext={localizedString.okayText}
            message={errorValidation}
            onPress={() => {
              seterrorValidation('');
              setName('');
              setEmail('');
              setsubject('');
              setdescripation('');
              setSuccess(false);
              setIspopupvisble(false);
            }}
          />
        </ScrollView>
      ) : null}
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
export default ContactUs;
