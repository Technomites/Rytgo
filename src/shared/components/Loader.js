import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';

export default function LoaderActivity(props) {
  const {
    show = false,
    color = '#0989B8',
    backgroundColor = 'white',
    dimLights = 0.4,
    loadingMessage = '',
  } = props;
  return (
    <Modal transparent={true} animationType="none" visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}>
        <View
          style={
            {
              //padding: 13,
              //backgroundColor: `${backgroundColor}`,
              //borderRadius: 13,
              //width: '80%',
            }
          }>
          <ActivityIndicator animating={show} color={color} size="large" />
          <Text
            style={{
              color: `white`,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {loadingMessage}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
