//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Switch,
  Linking,
  Platform,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import SettingCard from '../../shared/components/SettingCard';
import HorizontalLine from '../../shared/components/HorizontalLine';
import {UsereProfileData, _setLanguage} from '../../shared/Constant/Constant';
import IoIcon from '../../shared/components/Icon/IoIcon';
import {logout} from '../../shared/ApiMiddleware/api';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../shared/components/Loader';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import {localizedString} from '../../shared/localization/localization';
import {useSelector, useDispatch} from 'react-redux';
import * as openGuestPopup from '../../redux/action/Guestpopupaction';
import SuccessFailModel from '../../shared/components/SuccessFailModel';
import * as HomeAction from '../../redux/action/setWishList';
import * as citycategoryfeatureFilter from '../../redux/action/citycategoryfeatureFilter';

// create a component
const Setting = ({navigation, route}) => {
  const dispatch = useDispatch();
  let popstate = useSelector(state => state.GuestPopup.popup);

  const {RtlStyles, setLanguage, language} = useRtlContext();
  const [Imgeuri, setImgeuri] = useState('');
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const storeLanguageKey = async value => {
    try {
      //alert('aysnc ' + value);
      await AsyncStorage.setItem('LanguageKey', value);
    } catch (e) {
      //alert('error savng kay');
      // saving error
    }
  };
  const openUrl = (androidurl, iosurl) => {
    Platform.OS === 'ios'
      ? Linking.canOpenURL(iosurl).then(
          supported => {
            supported && Linking.openURL(iosurl);
          },
          err => console.log(err),
        )
      : Linking.openURL(androidurl).catch(err => console.error('Error', err));
  };
  const Logout = () => {
    setloading(true);
    const userData = {
      DeviceID: DeviceInfo.getUniqueId(),
    };
    logout(userData)
      .then(res => {
        // console.log(' res  osama' + JSON.stringify(res));
        if (res.status === 'success') {
          setloading(false);
          setLanguage('en');
          _setLanguage('en');
          AsyncStorage.clear();
          navigation.replace('SignIn2');
        } else {
          setLanguage('en');
          _setLanguage('en');
          setloading(false);
          AsyncStorage.clear();
          navigation.replace('SignIn2');
        }
      })
      .catch(err => {
        console.log(err);
      });
    // }
  };
  useEffect(() => {
    //User Profile && notofication count
    const unsubscribe = navigation.addListener('focus', () => {
      setImgeuri(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.logo
          : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      );
      setname(
        UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined
          ? UsereProfileData.name
          : '',
      );
    });

    return unsubscribe;
  }, []);
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: '#F1F3F5'}}>
      <ScrollView
        style={{}}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}>
        <Loader show={loading} />
        <BackHeader
          title={localizedString.settingText}
          onPress={() => navigation.navigate('Home')}
        />
        <HorizontalLine />
        <View
          style={{
            height: 82,
            width: '100%',
            padding: 21,
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <Image
            source={{
              uri:
                UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? Imgeuri
                  : 'https://cdn.imgbin.com/7/15/1/imgbin-computer-icons-user-profile-avatar-french-people-xM6vuY3iWZ6yhbNYaVeX2nvVL.jpg',
            }}
            style={{
              height: 53,
              width: 53,
              borderRadius: 53 / 2,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              height: '100%',
              marginTop: 4,
              marginLeft: 6,
            }}>
            <Text
              style={{
                color: '#191919',
                fontFamily: 'Inter-Bold',
                fontSize: 16,
                textAlign: 'left',
              }}>
              {UsereProfileData !== null &&
              UsereProfileData !== '' &&
              UsereProfileData !== undefined
                ? name
                : localizedString.guestuser}
            </Text>
            {UsereProfileData !== null &&
            UsereProfileData !== '' &&
            UsereProfileData !== undefined ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountInfo')}
                style={{
                  //marginTop: 5,
                  width: '60%',
                  //height: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //backgroundColor: 'red',
                }}>
                <View
                  style={{
                    // marginTop: 5,
                    //width: '50%',
                    // height: 20,
                    flexDirection: 'row',
                    //backgroundColor: 'red',
                    //justifyContent: 'center',
                    //alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 11,
                      textAlign: 'left',
                    }}>
                    {localizedString.accountInfoText}
                  </Text>

                  <IoIcon
                    name="chevron-forward"
                    color={colors.blue}
                    size={17}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.clear();
                  setLanguage('en');
                  _setLanguage('en');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn2'}],
                  });
                }}
                style={{
                  //marginTop: 5,
                  //width: '60%',
                  //height: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // marginTop: 5,
                    // width: '50%',
                    // height: 20,
                    flexDirection: 'row',
                    //justifyContent: 'center',
                    //alignItems: 'center',
                    //backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      color: '#191919',
                      // fontFamily: 'Inter-SemiBold',
                      fontSize: 11,
                      textAlign: 'left',
                    }}>
                    {localizedString.loginuserText}
                  </Text>

                  <IoIcon
                    name="chevron-forward"
                    color={colors.blue}
                    size={17}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* <HorizontalLine />
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            //padding: 22,
            height: 50,
            //padding: 12,
            //justifyContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 14,
            paddingLeft: 20,
            paddingRight: 14,
          }}>
          <Text style={{fontFamily: 'Inter-Bold', fontSize: 15}}>
            {localizedString.changeLanguage}
          </Text>

          <View
            style={{
              // width: '100%',
              //height: 100,
              //backgroundColor: 'red',
              alignItems: 'center',
              //justifyContent: 'center',
              flexDirection: 'row',
              //marginLeft: 15,
              //marginTop: 10,
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: 14,
                fontWeight: 'bold',
                //marginLeft: 10,
                marginRight: 5,
                textTransform: 'uppercase',
              }}>
              EN
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#0989B8'}}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={{marginHorizontal: 3}}
              //style={{width: '50%', height: '50%'}}
              onValueChange={() => {
                setLanguage(language !== 'ar' ? 'ar' : 'en');
                // setLanguage('ar');
                //TestFunction();
                setIsEnabled(!isEnabled);
                alert(language);
                _setLanguage(language !== 'ar' ? 'ar' : 'en');
                // _setLanguage('en');

                storeLanguageKey(language !== 'ar' ? 'ar' : 'en');
                dispatch(HomeAction.claearWishLIST());
                dispatch(
                  citycategoryfeatureFilter.claearallcitiescategoriesandproperties(),
                );
                //props.navigation.replace('Home');
              }}
              value={isEnabled}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: 14,
                fontWeight: 'bold',
                //marginLeft: 1,
                textTransform: 'uppercase',
              }}>
              AR
            </Text>
          </View>
        </View> */}

        <View
          style={{
            width: '100%',
            marginTop: 10,
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              {
                UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? navigation.navigate('MyRequest')
                  : dispatch(openGuestPopup.openGuestPopup(true));
              }
            }}>
            <SettingCard
              heading={localizedString.myrequestsText}
              imgPath={require('../../shared/assests/Profile/Listing.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              UsereProfileData !== null &&
              UsereProfileData !== '' &&
              UsereProfileData !== undefined
                ? navigation.navigate('MyWishList')
                : dispatch(openGuestPopup.openGuestPopup(true));
            }}>
            <SettingCard
              heading={localizedString.wishlistText}
              imgPath={require('../../shared/assests/Profile/Wishlist.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              UsereProfileData !== null &&
              UsereProfileData !== '' &&
              UsereProfileData !== undefined
                ? navigation.navigate('Alertstack', {name: 'Setting'})
                : dispatch(openGuestPopup.openGuestPopup(true));
              //navigation.navigate('Alertstack', {name: 'Setting'})
            }}>
            <SettingCard
              heading={localizedString.notificationsText}
              imgPath={require('../../shared/assests/Profile/Notifications.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('posttack', {name: 'News'})}>
            <SettingCard
              heading={localizedString.newsfeedText}
              imgPath={require('../../shared/assests/Profile/newsfeed.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              UsereProfileData !== null &&
              UsereProfileData !== '' &&
              UsereProfileData !== undefined
                ? navigation.navigate('ChangePassword')
                : dispatch(openGuestPopup.openGuestPopup(true));
              //navigation.navigate('Alertstack', {name: 'Setting'})
            }}>
            <SettingCard
              heading={localizedString.changepassword}
              imgPath={require('../../shared/assests/Profile/Seurity.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Help')}>
            <SettingCard
              heading={localizedString.helpText}
              imgPath={require('../../shared/assests/Profile/Privacy.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              openUrl(
                'https://play.google.com/store/apps/details?id=com.nbsvendor',
                'https://apps.apple.com/pk/app/nbs-vendor/id1614254527',
              )
            }>
            <SettingCard
              heading={localizedString.becomevendor}
              imgPath={require('../../shared/assests/Profile/becomevendor.png')}
              languagestyle={{...RtlStyles.containerRow}}
              iconstyle={{...RtlStyles.flipHorizontal}}
            />
          </TouchableOpacity>

          {UsereProfileData !== null &&
          UsereProfileData !== '' &&
          UsereProfileData !== undefined ? (
            <TouchableOpacity
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                UsereProfileData !== null &&
                UsereProfileData !== '' &&
                UsereProfileData !== undefined
                  ? Logout()
                  : dispatch(openGuestPopup.openGuestPopup(true));
              }}>
              <SettingCard
                heading={localizedString.logouttext}
                imgPath={require('../../shared/assests/Profile/SignOut.png')}
                languagestyle={{...RtlStyles.containerRow}}
                iconstyle={{...RtlStyles.flipHorizontal}}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      {/* <SuccessFailModel
        visible={popstate}
        message="No access . Login as a User"
        userClick={() => {
          dispatch(openGuestPopup.closeGuestPopup(false));
          AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{name: 'SignIn2'}],
          });
        }}
        onPress={() => {
          //setIspopupvisble(false);
          dispatch(openGuestPopup.closeGuestPopup(false));
        }}
      /> */}

      <SuccessFailModel
        visible={popstate}
        message={localizedString.successFailMeSSAGE}
        userClick={() => {
          setTimeout(() => {
            // write your functions
            AsyncStorage.clear();
            setLanguage('en');
            _setLanguage('en');
            navigation.reset({
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
});

//make this component available to the app
export default Setting;
