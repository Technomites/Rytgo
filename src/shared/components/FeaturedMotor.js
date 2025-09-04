//import liraries
import React, {Component, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {localizedString} from '../localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import FastImage from 'react-native-fast-image';

// create a component
const FeaturedMotor = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: 230,

        //backgroundColor: 'red',

        //height: 300,
        //margin: 13,
        // usama commit
        //margin: 13,
        marginLeft: 10,
        shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        borderRadius: 10,
        marginTop: 3,
        // flex: 1,
        //elevation: 12,
        // shadowColor: '#000',
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,

        // elevation: 6,

        ...props.conatinerStyle,
      }}>
      <TouchableOpacity style={{}} onPress={props.onClick}>
        <FastImage
          //resizeMode="cover"
          style={{
            width: '100%',
            height: 130,
            //backgroundColor: 'yellow',
          }}
          imageStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
          source={{
            uri: props.item?.thumbnail,
            priority: FastImage.priority.high,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
              padding: 9,
            }}>
            <Text
              style={{
                color: 'lightgray',
                fontSize: 13,
                fontFamily: 'Inter-SemiBold',
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {/* AED {props.item?.price} */}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: 'Inter-SemiBold',
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {localizedString.aed}
              {' ' + props.item?.price}
            </Text>
          </View>
        </FastImage>
        <View
          style={{
            width: '90%',
            marginTop: 13,
            //justifyContent: 'center',
            marginLeft: 12,
            height: 40,

            //backgroundColor: 'red',
            //alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Inter-Bold',
              textAlign: isRtl ? 'right' : 'left',
            }}>
            {props.item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#989898',
              fontSize: 11,
              fontFamily: 'Inter-Medium',
              textAlign: isRtl ? 'right' : 'left',
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
            marginTop: 8,
            marginBottom: 8,
            flexDirection: 'row',
            //backgroundColor: 'yellow',
          }}>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <Image
              resizeMode="contain"
              // resizeMode="cover"
              style={{width: 20}}
              source={require('../assests/home/autonew.png')}
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
              //resizeMode="cover"
              style={{width: 20}}
              source={require('../assests/home/Doornew.png')}
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
              {props.item?.door}
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
              //resizeMode="cover"
              style={{width: 20}}
              source={require('../assests/home/wheel.png')}
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
              {props.item?.wheels}
            </Text>
          </View>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <Image
              resizeMode="cover"
              style={{width: 18}}
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
        <Text style={{height: 6}}></Text>
      </TouchableOpacity>
    </View>
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

function arePropsEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  // alert(JSON.stringify(nextProps));
  // console.log(prevProps?.item?.thumbnail);
  if (prevProps?.item?.thumbnail === nextProps?.item?.thumbnail) {
    return true; // props are equal
  }
  // return prevProps?.item?.thumbnail === nextProps?.item?.thumbnail;
  return false;
}

//make this component available to the app
export default memo(FeaturedMotor, arePropsEqual);
