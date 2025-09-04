//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import {UsereProfileData, _setLanguage} from '../../shared/Constant/Constant';
import * as openGuestPopup from '../../redux/action/Guestpopupaction';
import {useSelector, useDispatch} from 'react-redux';
import SuccessFailModel from '../../shared/components/SuccessFailModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const Help = props => {
  const {RtlStyles, setLanguage} = useRtlContext();
  const dispatch = useDispatch();
  let popstate = useSelector(state => state.GuestPopup.popup);
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#F6F8F9'}}>
      <BackHeader
        title={localizedString.helpText}
        onPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          width: '100%',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('TermCondidtion', {
                heading: localizedString.aboutUs,
                url: 'https://nowbuysell.com/aboutus_mb?View=Mobile',
              })
            }
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Icon
                name="file-o"
                size={23}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.aboutUs}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('TermCondidtion', {
                heading: localizedString.termcondidtionText,
                url: 'https://nowbuysell.com/terms_mb?View=Mobile',
              })
            }
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Icon
                name="info"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.termcondidtionText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MIcon
                name="policy"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.privacypolicyText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Faq')}
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="question"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.faqText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CustomerSupport')}
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AIcon
                name="customerservice"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.customerText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ContactUs')}
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="phone"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.contactText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            //onPress={() => props.navigation.navigate('FeedBack')}
            onPress={() => {
              UsereProfileData !== null &&
              UsereProfileData !== '' &&
              UsereProfileData !== undefined
                ? props.navigation.navigate('FeedBack')
                : dispatch(openGuestPopup.openGuestPopup(true));
            }}
            style={{...styles.tileContainer, ...RtlStyles.containerRow}}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MIcon
                name="feedback"
                size={26}
                color="#0989B8"
                //onPress={() => setzoomInImage('')}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '75%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#191919',
                  fontSize: 15,
                }}>
                {localizedString.feedbackText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <SuccessFailModel
        visible={popstate}
        message={localizedString.successFailMeSSAGE}
        userClick={() => {
          setTimeout(() => {
            // write your functions
            AsyncStorage.clear();
            setLanguage('en');
            _setLanguage('en');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'SignIn2'}],
            });
          }, 2000);
          dispatch(openGuestPopup.closeGuestPopup(false));
        }}
        btntext={localizedString.successModelbtntext}
        heading={localizedString.successModelheading}
        onPress={() => {
          dispatch(openGuestPopup.closeGuestPopup(false));
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
  tileContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#98989815',
    borderRadius: 6,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
    // borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default Help;
