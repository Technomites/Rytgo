import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import IoIcon from '../components/Icon/IoIcon';
import {colors} from '../themes/theme';
const AuthButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={Styles.mainContainer}>
      <Text style={{fontSize: 15, color: colors.white}}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    width: '100%',
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default AuthButton;
