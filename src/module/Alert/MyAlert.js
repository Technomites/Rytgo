import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from '../../shared/themes/theme';
import BackHeader from '../../shared/components/BackHeader';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import AIcon from 'react-native-vector-icons/FontAwesome';
import PopUpModel from '../../shared/components/PopUp';
import AccessDeniedModel from '../../shared/components/AccessDeniedModel';
import {UsereProfileData, _setLanguage} from '../../shared/Constant/Constant';

import {
  alertNotifications,
  notificationRead,
} from '../../shared/ApiMiddleware/api';

var screenname = '';
const MyAlert = props => {
  const {RtlStyles, isRtl, setLanguage} = useRtlContext();

  //alert(screenname);
  if (props.route.params === undefined) {
  } else {
    const {name} = props.route.params;
    screenname = name;
    // console.log(props.route.params.name);
  }
  const [offsetproperty, setOffsetproperty] = useState(1);
  const [myNotoficationData, setmyNotoficationData] = useState([]);
  const notInitialRendeproperty = useRef(false);
  const [popupvisble, setIspopupvisble] = useState(false);
  const [errorValidation, seterrorValidation] = useState('');
  function LoadMoreNotfifcations() {
    setOffsetproperty(offsetproperty + 1);
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setmyNotoficationData([]);
      setOffsetproperty(1);
    });

    const subscribe = props.navigation.addListener('blur', () => {
      setmyNotoficationData([]);
      setOffsetproperty(10000000);
      screenname = '';
    });
    return unsubscribe, subscribe;
  }, []);

  useEffect(() => {
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   if (props.route.params === undefined) {
    //   } else {
    //     const {name} = props.route.params;
    //     screenname = name;
    //     //alert(screenname);
    //     //console.log(screenname + 'scr');
    //     console.log('focus');
    //     console.log(props.route.params.name);
    //   }
    // });
    alertNotifications(offsetproperty)
      .then(res => {
        if (res.status === 'success') {
          //alert('success');
          //console.log('Notifications' + JSON.stringify(res));
          setmyNotoficationData([...myNotoficationData, ...res.notifications]);
        } else {
          seterrorValidation(res.message + 'Session expired!');
          setIspopupvisble(true);
          //console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [offsetproperty]);

  const OnClickNotification = (id, readStatus, index) => {
    let newArr = [...myNotoficationData];
    newArr[index].isRead = 'true';
    setmyNotoficationData(newArr);
    notificationRead(id)
      .then(res => {
        // console.log(' res ' + JSON.stringify(res));
        // alert('call');
        if (res.status === 'success') {
          // alert('notification read');
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: colors.gray,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          height: 90,
          //textAlign: isRtl == true ? 'right' : 'left',
          marginLeft: isRtl == true ? 0 : 10,
          marginRight: isRtl == true ? -7 : 0,
          //marginHorizontal: 0,
          // marginVertical: 2,
          // backgroundColor: 'red',
          //marginHorizontal: 10,
          ...RtlStyles.containerRow,
        }}
        onPress={() => OnClickNotification(item.id, item.isRead, index)}>
        <View
          style={{
            height: '50%',
            width: '14%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#DEDEDE',
            borderRadius: 5,
            //backgroundColor: 'red',
            //...RtlStyles.containerColumn,
          }}>
          {/* <Image
            source={require('../../shared/assests/Alerts/Alert.png')}
            style={{height: 46, width: 46, resizeMode: 'cover'}}
          /> */}
          <AIcon
            name="bullhorn"
            size={25}
            color="#0989B8"

            // style={{width: 15, marginTop: 2, marginLeft: 10}}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '80%',
            marginTop: 35,
            marginHorizontal: 8,

            //backgroundColor: 'yellow',
            // ...RtlStyles.containerRow,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: 'bold',
              color: colors.black,
              textAlign: isRtl == true ? 'right' : 'left',
            }}>
            {item.title}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              ...RtlStyles.containerRow,
            }}>
            <View
              style={{
                width: '60%',
                //backgroundColor: 'red',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: '400',
                  color: 'gray',
                  fontSize: 12,
                  textAlign: isRtl == true ? 'right' : 'left',
                }}>
                {item.description}
              </Text>
            </View>
            {item.isRead === false ? (
              <View
                style={{
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  //backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#0989B8',
                    fontSize: 12,
                    fontFamily: 'Inter-SemiBold',
                    marginTop: 1,
                    textTransform: 'uppercase',
                  }}>
                  {localizedString.markreadText}
                </Text>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              fontWeight: '600',
              color: 'gray',
              fontSize: 12,
              textAlign: isRtl == true ? 'right' : 'left',
              marginHorizontal: 2,
            }}>
            {item.date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: colors.bgGray}}>
      <BackHeader
        title={localizedString.alertsText}
        onPress={() => {
          // props.navigation.goBack();
          screenname === 'alert'
            ? props.navigation.goBack()
            : props.navigation.navigate('Setting');
          screenname = '';
        }}
      />

      <FlatList
        data={myNotoficationData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
        onEndReached={() => LoadMoreNotfifcations()}
        onEndReachedThreshold={0.1}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: 'yellow',
        }}>
        {/* <View style={{width: '90%', marginTop: 20}}> */}

        {/* </View> */}
      </View>
      {/* <PopUpModel
        visible={popupvisble}
        message={errorValidation}
        onPress={() => {
          if (errorValidation.includes('denied')) {
            AsyncStorage.clear();
            //props.navigation.replace('SignIn2');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'SignIn2'}],
            });
          } else {
            setIspopupvisble(false);
          }
        }}
      /> */}
      <AccessDeniedModel
        visible={popupvisble}
        message={'You need to login to continue'}
        userClick={() => {
          setIspopupvisble(false);
          setTimeout(() => {
            AsyncStorage.clear();
            setLanguage('en');
            _setLanguage('en');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'SignIn2'}],
            });
          }, 2000);
        }}
        btntext="Login/SignUp"
        heading="Access denied.Login as a User"
        onPress={() => {
          setIspopupvisble(false);
          if (errorValidation.includes('denied')) {
            setTimeout(() => {
              AsyncStorage.clear();
              setLanguage('en');
              _setLanguage('en');
              props.navigation.reset({
                index: 0,
                routes: [{name: 'SignIn2'}],
              });
            }, 2000);
          } else {
            setIspopupvisble(false);
          }
        }}
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  tileContainer: {
    //height: 70,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
    flexDirection: 'row',

    backgroundColor: 'red',
  },
  listTextStyle: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '600',
  },
});

export default MyAlert;
