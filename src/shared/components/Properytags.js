//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

// create a component
const Properytags = props => {
  return (
    <>
      {props.item?.image !== null &&
      props.item?.image !== '' &&
      props.item?.image !== undefined ? (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: '#EBEDEE',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            // resizeMode="cover"
            style={{
              width: 22,
              height: 22,
              borderRadius: 22 / 2,
              backgroundColor: '#EBEDEE',
              //marginBottom: 2,
            }}
            source={{uri: props.item?.image, priority: FastImage.priority.high}}
            //source={require('../../shared/assests/Profile/Privacy.png')}
          />
        </View>
      ) : null}
      <Text
        style={{
          color: '#989898',
          marginLeft: 3,
          fontSize: 11,
          fontFamily: 'Inter-SemiBold',
          //textAlign: 'center',
          //marginTop: 6,
        }}>
        {props.item?.name}
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
