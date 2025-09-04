import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Switch,
} from 'react-native';
import {colors} from '../../shared/themes/theme';
import IoIcon from '../../shared/components/Icon/IoIcon';
import MaIcon from '../../shared/components/Icon/MaIcon';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';
import {logout} from '../../shared/ApiMiddleware/api';
const CustomDrawerStyle = props => {
  const Logout = () => {
    setloading(true);
    const userData = {
      DeviceID: DeviceInfo.getUniqueId(),
    };
    logout(userData)
      .then(res => {
        console.log(' res  osama' + JSON.stringify(res));
        if (res.status === 'Success') {
          AsyncStorage.clear();
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
    // }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../shared/assests/drawer/DrawerBg.png')}
        style={{flex: 1}}>
        <View
          style={{
            height: '10%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 40, width: 120, resizeMode: 'contain'}}
            source={require('../../shared/assests/drawer/drawerLogo.png')}
          />
        </View>

        <View
          style={{
            height: '20%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
          <View style={{marginTop: 10}}>
            <Text
              style={{
                color: colors.white,
                fontSize: 15,
                fontWeight: '700',
              }}>
              Osama Jamal
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: '50%',
              height: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.white, fontSize: 13, letterSpacing: 1}}>
              Account Info.
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('MyProfile')}>
              <IoIcon name="chevron-forward" color={colors.blue} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{marginTop: 50}}>
          <DrawerItemList {...props} />
          <TouchableOpacity
            style={{
              height: 50,
              width: '100%',
              alignItems: 'center',
              marginLeft: 20,
              flexDirection: 'row',
            }}>
            <MaIcon name="logout" color={colors.blue} />
            <View style={{marginLeft: 30}}>
              <Text
                style={{color: colors.white, fontSize: 15, fontWeight: 'bold'}}>
                Logoutr
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CustomDrawerStyle;
