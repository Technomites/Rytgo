import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ViewBase,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CreateClassHeader(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Inter-Bold',
          color: '#111111',
          opacity: 0.8,
          ...props.textstyle,
        }}>
        {props.title}
      </Text>
      <TouchableOpacity
        style={{position: 'absolute', left: 20}}
        onPress={() => navigation.pop()}>
        <Image source={require('../../shared/assests/Profile/arrow.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styleSheet = StyleSheet.create({});
