//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import {localizedString} from '../localization/localization';

// create a component
const FeaturedMotor = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: 160,
          //height: 300,
          marginLeft: 14,
          //marginTop: 8,
          //shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 6,
          // },
          // shadowOpacity: 0.37,
          // shadowRadius: 7.49,
          //borderRadius: 10,
          //elevation: 12,
          borderRadius: 2,
          ...props.conatinerStyle,
        }}>
        <ImageBackground
          //resizeMode="cover"
          style={{
            width: '100%',
            height: 120,
          }}
          // imageStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
          source={{uri: props.item?.thumbnail}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
              padding: 9,
              //backgroundColor: 'red',
            }}>
            <Text
              style={{
                color: 'lightgray',
                fontSize: 13,
                fontFamily: 'Inter-SemiBold',
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              {/* AED {props.item?.regularPrice} */}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: 'Inter-SemiBold',
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {localizedString.aed} {props.item?.salePrice}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            width: '90%',
            marginTop: 13,
            justifyContent: 'center',
            marginLeft: 12,
            //alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{color: 'black', fontSize: 11, fontFamily: 'Inter-Bold'}}>
            {props.item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#989898',
              fontSize: 10,
              fontFamily: 'Inter-Medium',
            }}>
            {props.item?.address}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
            marginTop: 4,
          }}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            marginTop: 14,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 50}}
              source={require('../assests/home/autonew.png')}
            />
            <Text
              style={{
                fontSize: 9,
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
                fontWeight: '700',
                color: '#989898',
              }}>
              {props.item?.transmission}
            </Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 50}}
              source={require('../assests/home/Doornew.png')}
            />
            <Text
              style={{
                fontSize: 9,
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
                fontWeight: '700',
                color: '#989898',
              }}>
              {props.item?.doors}
            </Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              // style={{width: 50}}
              source={require('../assests/home/wheel.png')}
            />
            <Text
              style={{
                fontSize: 9,
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
                fontWeight: '700',
                color: '#989898',
              }}>
              {props.item?.wheels}
            </Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 50}}
              source={require('../assests/home/carbattery.png')}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 9,
                textAlign: 'center',
                fontFamily: 'Inter-Medium',
                fontWeight: '700',
                color: '#989898',
              }}>
              {props.item?.engineDisplacement}
            </Text>
          </View>
        </View>
        <Text style={{height: 8}}></Text>
      </View>
    </TouchableOpacity>
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
export default FeaturedMotor;
