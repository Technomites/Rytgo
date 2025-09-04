import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../shared/themes/theme';

import IoIcon from './Icon/IoIcon';
import MaIcon from './Icon/MaIcon';
const BackHeader = props => {
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        ...props.containerStyle,
      }}>
      <TouchableOpacity
        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
        onPress={props.onPress}
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
          //backgroundColor: 'red',
        }}>
        <IoIcon name="arrow-back" size={26} color="black" />
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          width: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: colors.black, fontSize: 20}}>
          {props.title}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}></TouchableOpacity>
    </View>
  );
};
export default BackHeader;
