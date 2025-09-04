//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CreateClassHeader from '../../shared/components/CreateClassHeader';
// create a component
const Alert = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white', width: '100%'}}>
      <CreateClassHeader title="Alerts" />
    </ScrollView>
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
export default Alert;
