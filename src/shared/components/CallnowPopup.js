import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../themes/theme';
import IoIcon from './Icon/IoIcon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {localizedString} from '../localization/localization';

const CallnowPopup = props => {
  // console.log('denied');
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#00000059',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          //onPress={props.userClick}
          activeOpacity={1}>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#00000059',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                // height: '42%',
                padding: 13,
                width: '85%',
                backgroundColor: colors.white,
                borderRadius: 10,
                //justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {localizedString.contactText}
              </Text>

              <Text
                style={{
                  // fontWeight: '600',
                  fontSize: 12,
                  color: '#11111180',
                  marginTop: 1,
                  fontFamily: 'Inter-Medium',
                  // fontWeight: 'bold',
                }}>
                {props?.vendorData?.name}
              </Text>

              <TouchableOpacity
                onPress={props.openDialer}
                style={{
                  width: '93%',
                  padding: 10,
                  backgroundColor: '#0989B8',
                  height: 50,
                  borderRadius: 8,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 13,
                }}>
                <View
                  style={{
                    width: '100%',
                    //   padding: 10,
                    //   backgroundColor: '#0989B8',
                    //   height: 50,
                    //   borderRadius: 8,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      // fontWeight: '600',
                      fontSize: 12,
                      color: '#FFFFFF',
                      fontFamily: 'Inter-Medium',
                      marginTop: 1,
                      // fontWeight: 'bold',
                    }}>
                    {localizedString.mobileText}
                  </Text>
                  <Text
                    style={{
                      // fontWeight: '600',
                      fontSize: 12,
                      color: '#FFFFFF',
                      fontFamily: 'Inter-Medium',
                      marginTop: 1,
                      // fontWeight: 'bold',
                    }}>
                    {props?.vendorData?.mobile}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={props.openDialer}
                style={{
                  width: '93%',
                  padding: 10,
                  backgroundColor: '#0989B8',
                  height: 50,
                  borderRadius: 8,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 13,
                }}>
                <View
                  style={{
                    width: '100%',
                    //   padding: 10,
                    //   backgroundColor: '#0989B8',
                    //   height: 50,
                    //   borderRadius: 8,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    //   marginTop: 13,
                  }}>
                  <Text
                    style={{
                      // fontWeight: '600',
                      fontSize: 12,
                      color: '#FFFFFF',
                      fontFamily: 'Inter-Medium',
                      marginTop: 1,
                      // fontWeight: 'bold',
                    }}>
                    {localizedString.phoneText}
                  </Text>
                  <Text
                    style={{
                      // fontWeight: '600',
                      fontSize: 12,
                      color: '#FFFFFF',
                      fontFamily: 'Inter-Medium',
                      marginTop: 1,
                      // fontWeight: 'bold',
                    }}>
                    {props?.vendorData?.contact}
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '90%',
                  marginTop: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    // fontWeight: '600',
                    fontSize: 12,
                    color: '#11111180',
                    marginTop: 1,
                    fontFamily: 'Inter-Medium',
                    // fontWeight: 'bold',
                  }}>
                  {localizedString.callpopupHeading}
                </Text>
                <Text
                  style={{
                    // fontWeight: '600',
                    fontSize: 12,
                    color: '#11111180',
                    marginTop: 1,
                    fontFamily: 'Inter-ExtraBold',
                    // fontWeight: 'bold',
                  }}>
                  {props.refernceid}
                </Text>
                <TouchableOpacity onPress={props.userClick}>
                  <Text
                    style={{
                      // fontWeight: '600',
                      fontSize: 12,
                      color: '#11111180',
                      marginTop: 7,
                      fontFamily: 'Inter-Medium',
                      // fontWeight: 'bold',
                    }}>
                    {localizedString.closeText}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                onPress={props.userClick}
                style={{
                  height: 47,
                  width: '100%',
                  backgroundColor: colors.blue,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.white,
                    textTransform: 'uppercase',
                  }}>
                  {props.btntext}
                </Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
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

export default CallnowPopup;
