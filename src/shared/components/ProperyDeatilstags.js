//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';

// create a component
const Properytags = props => {
  const {RtlStyles, isRtl} = useRtlContext();
  return (
    <>
      <Text
        numberOfLines={1}
        style={{
          color: '#191919',
          fontSize: 12,
          fontFamily: 'Inter-SemiBold',
          textAlign: isRtl ? 'right' : 'left',
          // textAlign: 'center',
        }}>
        {props.heading}
      </Text>
      <Text
        style={{
          color: '#989898',
          fontSize: 10,
          fontFamily: 'Inter-SemiBold',
          textAlign: isRtl ? 'right' : 'left',
        }}>
        {props.value}
      </Text>
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

export default Properytags;
