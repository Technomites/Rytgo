//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {localizedString} from '../localization/localization';
import LeftArrow from 'react-native-vector-icons/AntDesign';
import {propertyDeatils} from '../ApiMiddleware/api';

// create a component
const ContactSellerBody = props => {
  return (
    <>
      <Image
        source={{
          uri: props.image,
        }}
        style={{
          height: 70,
          width: 70,
          borderRadius: 70 / 2,
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          //alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 13,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#989898',
              fontFamily: 'Inter-Medium',
              fontSize: 11,
            }}>
            {props.permitheading}
          </Text>
          <Text
            style={{
              color: '#989898',
              fontFamily: 'Inter-Medium',
              fontSize: 11,
            }}>
            {props.permitno}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* <Text
            style={{
              color: '#989898',
              fontFamily: 'Inter-Medium',
              fontSize: 12,
            }}>
            {localizedString.rERANOText}
          </Text> */}
          <Text
            style={{
              color: '#191919',
              fontFamily: 'Inter-Bold',
              fontSize: 13,
              marginLeft: 1,
            }}>
            {props.name}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => props.onpress()}>
            <Text
              style={{
                color: '#0989B8',
                fontSize: 11,
                fontFamily: 'Inter-Bold',
                marginTop: 1,
              }}>
              {props.viewlisting}
            </Text>
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 18 / 2,
                borderWidth: 1,
                borderColor: '#D3CAD7',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0989B8',
                marginLeft: 4,
                marginBottom: 6,
              }}>
              <LeftArrow name="arrowright" size={11} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* {props.dedno !== null &&
        props.dedno !== '' &&
        props.dedno !== undefined ? (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {localizedString.dEDNOText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                marginLeft: 12,
              }}>
              {props.dedno}
            </Text>
          </View>
        ) : null} */}

        {/* {props.permitno !== null &&
        props.permitno !== '' &&
        props.permitno !== undefined ? (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
              }}>
              {localizedString.permitText}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                marginLeft: 12,
              }}>
              {props.permitno}
            </Text>
          </View>
        ) : null} */}
      </View>
    </>
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
export default ContactSellerBody;
