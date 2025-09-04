//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {localizedString} from '../../shared/localization/localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const PropertyType = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View
        style={{
          width: 220,
          height: 90,
          borderRadius: 2,
          backgroundColor: '#FFFFFF',
          elevation: 10,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          borderColor: 'lightgrey',
          borderWidth: 1,

          shadowColor: '#0000001F',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginRight: 17,
          overflow: 'visible',
          bottom: 19,
          zIndex: 210,
          borderRadius: 12,
          // ...RtlStyles.containerRow,
          // marginHorizontal: 5,
          //borderWidth: 2,
          //borderColor: 'red',
        }}>
        <View style={{marginHorizontal: 10}}>
          <Image resizeMode="contain" source={props.item?.image} />
        </View>
        <View style={{}}>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Inter-Bold',
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: 8,
            }}>
            {props.item.title}
          </Text>
          <Text
            style={{
              color: '#19191980',
              fontSize: 10,
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: 8,
            }}>
            {props.item.title === 'Motors For Sale'
              ? localizedString.perfectmotorText
              : localizedString.perfecthomeText}
          </Text>
        </View>
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
export default PropertyType;
