//import liraries
import React, {Component, memo, useMemo} from 'react';
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
const FeaturedProperty = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <View
      style={{
        // backgroundColor: '#FFFFFF',
        // width: 230,
        // //height: 300,
        // marginLeft: 13,
        // shadowColor: '#000',

        // borderRadius: 10,
        // marginTop: 3,
        ...styles.container,
        ...props.conatinerStyle,
      }}>
      <TouchableOpacity onPress={props.onClick}>
        <FastImage
          style={{
            ...styles.fasimageContainer,
          }}
          // imageStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
          imageStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
          source={{
            uri: props.item?.thumbnail,
            priority: FastImage.priority.high,
          }}>
          <View
            style={{
              ...styles.priceView,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: 'Inter-SemiBold',
                textAlign: isRtl ? 'right' : 'left',
              }}>
              {localizedString.aed} {props.item?.price}
            </Text>
          </View>
        </FastImage>

        <View
          style={{
            ...styles.addresssView,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 11,
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
            ...styles.lineColor,
          }}
        />
        <View
          style={{
            ...styles.bottomImagesView,
          }}>
          <View
            style={{
              // width: '25%',
              // alignItems: 'center',
              // justifyContent: 'center',
              ...styles.iconView,
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 30}}
              // style={{width: 14}}
              source={require('../assests/property/bednew.png')}
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
              {props.item?.rooms}
            </Text>
          </View>
          <View
            style={{
              // width: '25%',
              // alignItems: 'center',
              // justifyContent: 'center',
              ...styles.iconView,
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 30}}
              style={{width: 14}}
              source={require('../assests/property/bath.png')}
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
              {props.item?.baths}
            </Text>
          </View>
          <View
            style={{
              ...styles.iconView,
              //backgroundColor: 'red',
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 30, backgroundColor: 'red'}}
              style={{width: 20}}
              source={require('../assests/home/garagenew.png')}
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
              {props.item?.garages}
            </Text>
          </View>
          <View
            style={{
              ...styles.iconView,
              //backgroundColor: 'red',
            }}>
            <Image
              resizeMode="contain"
              //style={{width: 30, backgroundColor: 'red'}}
              style={{width: 14}}
              source={require('../assests/property/ruler-triangle.png')}
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
              {props.item?.size}
            </Text>
          </View>
        </View>

        <Text style={{height: 7}}></Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: 230,
    //height: 300,
    marginLeft: 13,
    shadowColor: '#000',

    borderRadius: 10,
    marginTop: 3,
  },
  fasimageContainer: {
    width: '100%',
    height: 133,
  },
  priceView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 9,
  },
  addresssView: {
    width: '90%',
    marginTop: 13,

    marginLeft: 12,
    height: 40,
  },
  lineColor: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginTop: 4,
  },
  bottomImagesView: {
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 6,
    flexDirection: 'row',
  },
  iconView: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
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
export default memo(FeaturedProperty, arePropsEqual);
