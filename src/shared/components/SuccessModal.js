import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {colors} from '../themes/theme';
import IoIcon from '../components/Icon/IoIcon';
import AuthButton from '../components/AuthButton';

const SuccessModal = props => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000059',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '33%',
              width: '80%',
              backgroundColor: colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IoIcon name="checkmark-circle" size={50} color={colors.blue} />
            <Text
              style={{fontWeight: 'bold', fontSize: 20, color: colors.black}}>
              Done!
            </Text>
            <Text style={{fontWeight: '600', fontSize: 13, color: colors.gray}}>
              Your request has been submitted successfully
            </Text>
            <View style={{width: '86%', marginTop: 10}}>
              <AuthButton onPress={props.modelOff} title="RETURN HOME" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SuccessModal;
