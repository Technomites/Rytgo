import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import MyRequestCard from '../../shared/components/MyRequestCard';
import {GetAllRequest} from '../../shared/ApiMiddleware/api';
import Loader from '../../shared/components/Loader';
import {localizedString} from '../../shared/localization/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpModel from '../../shared/components/PopUp';
import AccessDeniedModel from '../../shared/components/AccessDeniedModel';
import {_setLanguage} from '../../shared/Constant/Constant';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

const MyRequestRent = props => {
  const {RtlStyles, isRtl, language, setLanguage} = useRtlContext();
  const [requestrent, setrequestrent] = useState([]);
  const [loading, setloading] = useState(false);
  const [popupvisble, setIspopupvisble] = useState(false);
  const [errorValidation, seterrorValidation] = useState('');

  const NavigateToRequestDeatils = id => {
    props.navigation.navigate('RequestDeatils', {
      id: id,
    });
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setloading(true);
      setrequestrent([]);
      GetAllRequest()
        .then(res => {
          //console.log(' res ' + JSON.stringify(res));
          if (res.status === 'success') {
            //console.log(' res blogs ' + JSON.stringify(res));
            console.log(' res ' + JSON.stringify(res.propertiesForRent));
            setrequestrent(res.propertiesForRent);
            setloading(false);
          } else {
            //console.log(res);
            seterrorValidation(res.message);
            setIspopupvisble(true);
            setloading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });

    const subscribe = props.navigation.addListener('blur', () => {
      setrequestrent([]);
    });
    return unsubscribe, subscribe;
  }, []);
  return (
    <View style={{height: '100%', backgroundColor: '#F6F8F9', width: '100%'}}>
      <Loader show={loading} />
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('PropertyForRentScreen', {
            name: 'Property',
            forsale: 0,
            type: 'rent',
          })
        }>
        <View
          style={{
            height: 64,
            width: '100%',
            padding: 20,
            alignItems: 'center',
            flexDirection: 'row',
            //backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              //backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Icon name="plus" size={24} color={'#0989B8'} />
            <Text
              style={{
                marginLeft: 12,
                color: '#141414',
                fontFamily: 'Inter-Bold',
              }}>
              {localizedString.createRequestText}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              width: '30%',
              height: 20,
              marginTop: 10,
              //backgroundColor: 'yellow',
            }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#D3CAD7',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LeftArrow name="arrowright" size={19} color={'#0989B8'} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <FlatList
        data={requestrent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, i}) => (
          <View
            style={{
              marginTop: 12,
            }}>
            <MyRequestCard
              key={i}
              item={item}
              onClick={() => {
                NavigateToRequestDeatils(item.id);
              }}
            />
          </View>
        )}
        // keyExtractor={(item, index) => index.toString()}
      />
      {/* <PopUpModel
        visible={popupvisble}
        message={errorValidation}
        onPress={() => {
          if (errorValidation.includes('Authorization failed')) {
            AsyncStorage.clear();
            //props.navigation.replace('SignIn2');
            props.navigation.reset({
              index: 0,
              routes: [{name: 'SignIn2'}],
            });
          } else {
            //setFeedback('');
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
    </View>
  );
};

export default MyRequestRent;
