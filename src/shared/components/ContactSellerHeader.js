//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {localizedString} from '../localization/localization';

// create a component
const ContactSellerHeader = props => {
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Inter-Bold',
          color: '#111111',
          //opacity: 0.8,
          // ...props.textstyle,
        }}>
        {/* {localizedString.contactSellerText} */}
        {props?.heading}
      </Text>
      <TouchableOpacity
        style={{position: 'absolute', right: 20}}
        onPress={() => props.onclose()}>
        <Icon name="cross" size={20} />
      </TouchableOpacity>
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
export default ContactSellerHeader;
